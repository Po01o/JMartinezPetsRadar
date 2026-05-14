import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { logger } from 'src/config/logger';
import { CacheService } from 'src/cache/cache.service';
import { LostPet } from 'src/core/db/entities/lost-pet.entity';
import { LostPetCDto } from 'src/core/interfaces/lost-pet.interface';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';

const CACHE_KEY_ALL_LOST_PETS = 'lost-pets:all';

@Injectable()
export class LostPetsService {
    constructor(
        @InjectRepository(LostPet)
        private readonly lostPetRepository: Repository<LostPet>,
        private readonly cacheService: CacheService
        //private readonly emailService: EmailService
    ){}

    async createLostPet(lostPet: LostPetCDto): Promise<LostPet>{
        const newLostPet = this.lostPetRepository.create({
            name: lostPet.name,
            species: lostPet.species,
            breed: lostPet.breed,
            color: lostPet.color,
            size: lostPet.size,
            description: lostPet.description,
            photo_url: lostPet.photo_url,
            owner_name: lostPet.owner_name,
            owner_email: lostPet.owner_email,
            owner_phone: lostPet.owner_phone,
            location: {
                type: 'Point',
                coordinates:[lostPet.lon, lostPet.lat]
            },
            address: lostPet.address,
            lost_date: lostPet.lost_date,
        });
        const result = await this.lostPetRepository.save(newLostPet);
        await this.cacheService.delete(CACHE_KEY_ALL_LOST_PETS);
        //const template = generateIncidentEmailTemplate(incident);
        /*const options: EmailOptions = {
            to: "carlosjoel.martinezlopez@gmail.com",
            subject: incident.title,
            html: template
        }*/
        //const result = await this.emailService.sendEmail(options);

        return result;
    }

    async getLostPetsByRadius(
        lat: number,
        lon: number,
        radius: number,
    ): Promise<LostPet[]> {
        try {
        console.log(
            `Buscando incidentes en ${lat} ${lon} en un radio de ${radius} mts`,
        );
        const lostPets = await this.lostPetRepository
            .createQueryBuilder('lost_pet')
            .addSelect(
            `
                    ST_Distance(
                        lost_pet.location::geography,
                        ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography
                    )
                    `,
            'distance',
            )
            .where('lost_pet.is_active = true')
            .andWhere(
            `
                    ST_DWithin(
                        lost_pet.location::geography,
                        ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography,
                        :radius
                    )
                    `,
            )
            .orderBy('distance', 'ASC')
            .setParameters({ lon, lat, radius })
            .getMany();
        console.log(
            `Se encontraron ${lostPets.length} en un radio de ${radius} mts`,
        );
        return lostPets;
        } catch (error) {
        console.error(error);
        return [];
        }
    }

    async getLostPets() {
        try {
        const data = await this.cacheService.get<LostPet[]>(
            CACHE_KEY_ALL_LOST_PETS,
        );

        if (data && data.length > 0) {
            logger.info('[LostPetsService] Mascotas perdidas en cache');
            return data;
        }
        logger.info('[LostPetsService] Trayendo todas las mascotas perdidas...');
        const lostPets = await this.lostPetRepository.find();
        logger.info('[LostPetsService] Guardando mascotas perdidas en cache');
        await this.cacheService.set(CACHE_KEY_ALL_LOST_PETS, lostPets);
        logger.info(
            `[LostPetsService] Se obtuvieron ${lostPets.length} mascotas perdidas`,
        );
        return lostPets;
        } catch (error) {
        console.error('[LostPetsService] Error al traer las mascotas perdidas');
        console.error(error);
        return [];
        }
    }
}

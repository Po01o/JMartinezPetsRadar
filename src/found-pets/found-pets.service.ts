import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoundPet } from 'src/core/db/entities/found-pet.entity';
import { FoundPetCDto } from 'src/core/interfaces/found-pet.interface';
import { EmailOptions } from 'src/core/interfaces/mail-options.interface';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { generateFoundPetEmailTemplate } from './templates/found-pets-email.template';
import { CacheService } from 'src/cache/cache.service';
import { LostPetsService } from 'src/lost-pets/lost-pets.service';
import { envs } from 'src/config/envs';
import { logger } from 'src/config/logger';

const CACHE_KEY_ALL_FOUND_PETS = 'found-pets:all';

@Injectable()
export class FoundPetsService {
    constructor(
        @InjectRepository(FoundPet)
        private readonly foundPetRepository: Repository<FoundPet>,
        private readonly emailService: EmailService,
        private readonly cacheService: CacheService,
        private readonly lostPetsService: LostPetsService
    ){}

    async createFoundPet(foundPet: FoundPetCDto): Promise<Boolean>{
        const newFoundPet = this.foundPetRepository.create({
            species: foundPet.species,
            breed: foundPet.breed,
            color: foundPet.color,
            size: foundPet.size,
            description: foundPet.description,
            photo_url: foundPet.photo_url,
            finder_name: foundPet.finder_name,
            finder_email: foundPet.finder_email,
            finder_phone: foundPet.finder_phone,
            location: {
                type: 'Point',
                coordinates:[foundPet.lon, foundPet.lat]
            },
            address: foundPet.address,
            found_date: foundPet.found_date,
        });
        await this.foundPetRepository.save(newFoundPet);
        await this.cacheService.delete(CACHE_KEY_ALL_FOUND_PETS)

        const lostPets = await this.lostPetsService.getLostPetsByRadius(
            foundPet.lat,
            foundPet.lon,
            500
        );

        const template = generateFoundPetEmailTemplate(foundPet, lostPets);
        const options: EmailOptions = {
            to: envs.TEST_EMAIL,
            subject: `Se encontro una mascota cerca de ${foundPet.address}`,
            html: template
        }
        const result = await this.emailService.sendEmail(options);

        return result;
    }
    
    async getFoundPets() {
        try {
            const data = await this.cacheService.get<FoundPet[]>(
                CACHE_KEY_ALL_FOUND_PETS,
            );

            if (data && data.length > 0) {
                logger.info('[FoundPetsService] Mascotas encontradas en cache');
                return data;
            }
            logger.info('[FoundPetsService] Trayendo todas las mascotas encontradas...');
            const foundPets = await this.foundPetRepository.find();
            logger.info('[FoundPetsService] Guardando mascotas encontradas en cache');
            await this.cacheService.set(CACHE_KEY_ALL_FOUND_PETS, foundPets);
            logger.info(
            `[FoundPetsService] Se obtuvieron ${foundPets.length} mascotas encontradas`,
        );
        return foundPets;
        } catch (error) {
            console.error('[FoundPetsService] Error al traer las mascotas encontradas');
            console.error(error);
            return [];
        }
    }
}

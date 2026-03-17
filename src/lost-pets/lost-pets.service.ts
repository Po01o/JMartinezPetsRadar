import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LostPet } from 'src/core/db/entities/lost-pet.entity';
import { LostPetCDto } from 'src/core/interfaces/lost-pet.interface';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';

@Injectable()
export class LostPetsService {
    constructor(
        @InjectRepository(LostPet)
        private readonly lostPetRepository: Repository<LostPet>,
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
        //const template = generateIncidentEmailTemplate(incident);
        /*const options: EmailOptions = {
            to: "carlosjoel.martinezlopez@gmail.com",
            subject: incident.title,
            html: template
        }*/
        //const result = await this.emailService.sendEmail(options);

        return result;
    }
}

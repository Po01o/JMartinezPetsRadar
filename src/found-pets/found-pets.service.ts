import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoundPet } from 'src/core/db/entities/found-pet.entity';
import { FoundPetCDto } from 'src/core/interfaces/found-pet.interface';
import { EmailOptions } from 'src/core/interfaces/mail-options.interface';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { generateFoundPetEmailTemplate } from './templates/found-pets-email.template';

@Injectable()
export class FoundPetsService {
    constructor(
            @InjectRepository(FoundPet)
            private readonly foundPetRepository: Repository<FoundPet>,
            private readonly emailService: EmailService
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
            const template = generateFoundPetEmailTemplate(foundPet);
            const options: EmailOptions = {
                to: "carlosjoel.martinezlopez@gmail.com",
                subject: foundPet.address,
                html: template
            }
            const result = await this.emailService.sendEmail(options);
    
            return result;
        }
}

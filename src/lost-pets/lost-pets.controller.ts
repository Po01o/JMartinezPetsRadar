import { Body, Controller, Post } from '@nestjs/common';
import { LostPetsService } from './lost-pets.service';
import type { LostPetCDto } from 'src/core/interfaces/lost-pet.interface';

@Controller('lost-pets')
export class LostPetsController {
    constructor(private readonly lostPetService: LostPetsService){}

    @Post()
    async createLostPet(@Body() lostPet: LostPetCDto){
        const result = await this.lostPetService.createLostPet(lostPet);
        return result
    }
}


import { Body, Controller, Get, Post } from '@nestjs/common';
import { FoundPetsService } from './found-pets.service';
import type { FoundPetCDto } from 'src/core/interfaces/found-pet.interface';

@Controller('found-pets')
export class FoundPetsController {
    constructor(private readonly foundPetService: FoundPetsService){}
    
    @Post()
    async createFoundPet(@Body() foundPet: FoundPetCDto){
        const result = await this.foundPetService.createFoundPet(foundPet);
        return result;
    }

    @Get()
    async getFoundPets() {
        const result = await this.foundPetService.getFoundPets();
        return result;
    }
}

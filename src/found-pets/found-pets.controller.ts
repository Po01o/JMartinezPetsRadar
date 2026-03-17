import { Body, Controller, Post } from '@nestjs/common';
import { FoundPetsService } from './found-pets.service';
import type { FoundPetCDto } from 'src/core/interfaces/found-pet.interface';

@Controller('found-pets')
export class FoundPetsController {
    constructor(private readonly foundPetService: FoundPetsService){}
    
    @Post()
    async createLostPet(@Body() foundPet: FoundPetCDto){
        const result = await this.foundPetService.createFoundPet(foundPet);
        return result
    }
}

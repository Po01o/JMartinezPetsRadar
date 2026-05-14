import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

    @Get()
    async getLostPets() {
        const result = await this.lostPetService.getLostPets();
        return result;
    }
    
    @Get('radius')
    async getLostPetsByRadius(
        @Query('lat') lat: number,
        @Query('lon') lon: number,
        @Query('radius') radius: number,
    ) {
        const result = await this.lostPetService.getLostPetsByRadius(lat, lon, radius);
        return result;
    }
}


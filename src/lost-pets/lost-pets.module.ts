import { Module } from '@nestjs/common';
import { LostPetsService } from './lost-pets.service';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LostPet } from 'src/core/db/entities/lost-pet.entity';
import { LostPetsController } from './lost-pets.controller';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([LostPet])
  ],
  providers: [LostPetsService],
  controllers: [LostPetsController]
})
export class LostPetsModule {}

import { Module } from '@nestjs/common';
import { FoundPetsController } from './found-pets.controller';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoundPet } from 'src/core/db/entities/found-pet.entity';
import { FoundPetsService } from './found-pets.service';
import { LostPetsModule } from 'src/lost-pets/lost-pets.module';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([FoundPet]),
    LostPetsModule,
    CacheModule
  ],
  providers: [FoundPetsService],
  controllers: [FoundPetsController]
})
export class FoundPetsModule {}

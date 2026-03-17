import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { LostPetsController } from './lost-pets/lost-pets.controller';
import { LostPetsModule } from './lost-pets/lost-pets.module';
import { FoundPetsService } from './found-pets/found-pets.service';
import { FoundPetsModule } from './found-pets/found-pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './core/db/data-source';

@Module({
  imports: [
    EmailModule, 
    LostPetsModule, 
    FoundPetsModule,
    TypeOrmModule.forRoot(dataSourceOptions)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

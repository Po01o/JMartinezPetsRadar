//import { IncidentType } from "src/core/enums/incident-type.enum";
import { PetSize } from "src/core/enums/pet-size.enum";
import { PetSpecies } from "src/core/enums/pet-species.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import type { Point } from "typeorm";

@Entity("found_pet")
export class FoundPet{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({ type: 'varchar' })
    species!:PetSpecies;

    @Column({ nullable: true })
    breed?: string;

    @Column()
    color!: string;

    @Column({ type: 'varchar' })
    size!: PetSize;

    @Column({ type: "text" })
    description!: string;

    @Column({ nullable: true })
    photo_url?: string;

    @Column()
    finder_name!: string;

    @Column()
    finder_email!: string;

    @Column()
    finder_phone!: string;
    
    @Column({ 
        type:'geometry',
        spatialFeatureType: 'Point',
        srid: 4326
    })
    location!: Point;

    @Column()
    address!: string;

    @Column({ type: "timestamp" })
    found_date!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: string;
}
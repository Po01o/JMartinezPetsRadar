//import { IncidentType } from "src/core/enums/incident-type.enum";
import { PetSize } from "src/core/enums/pet-size.enum";
import { PetSpecies } from "src/core/enums/pet-species.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import type { Point } from "typeorm";

@Entity("lost_pet")
export class LostPet{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    name!:string;

    @Column({ type: 'varchar' })
    species!:PetSpecies;

    @Column()
    breed!: string;

    @Column()
    color!: string;

    @Column({ type: 'varchar' })
    size!: PetSize;

    @Column({ type: "text" })
    description!: string;

    @Column({ nullable: true })
    photo_url?: string;

    @Column()
    owner_name!: string;

    @Column()
    owner_email!: string;

    @Column()
    owner_phone!: string;
    
    @Column({ 
        type:'geometry',
        spatialFeatureType: 'Point',
        srid: 4326
    })
    location!: Point;

    @Column()
    address!: string;

    @Column({ type: "timestamp" })
    lost_date!: Date;

    @Column({ default: true })
    is_active!: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: string;
}
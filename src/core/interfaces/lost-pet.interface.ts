//import { IncidentType } from "../enums/incident-type.enum";

import { PetSize } from "../enums/pet-size.enum";
import { PetSpecies } from "../enums/pet-species.enum";

//DTO
export interface LostPetCDto {
    name: string;
    species: PetSpecies;
    breed: string;
    color: string;
    size: PetSize;
    description: string;
    photo_url?: string;
    owner_name: string;
    owner_email: string;
    owner_phone: string;
    lat: number;
    lon: number;
    address: string;
    lost_date: string;
}
//import { IncidentType } from "src/core/enums/incident-type.enum";
import { PetSpecies } from "src/core/enums/pet-species.enum";
import { FoundPetCDto } from "src/core/interfaces/found-pet.interface";
import { generateMapboxImage } from "src/core/utils/utils";
 
const petSpeciesLabels: Record<PetSpecies, { label: string; color: string; icon: string }> = {
    [PetSpecies.DOG]: { label: "Perro", color: "#814011", icon: "🐶" },
    [PetSpecies.CAT]: { label: "Gato", color: "#4528a2", icon: "🐱" },
    [PetSpecies.BIRD]: { label: "Ave", color: "#d3e73c", icon: "🐦" },
    [PetSpecies.FISH]: { label: "Pez", color: "#3c6fe7", icon: "🐟" },
    [PetSpecies.RABBIT]: { label: "Conejo", color: "#707070", icon: "🐰" },
    [PetSpecies.HAMSTER]: { label: "Hamster", color: "#F39C12", icon: "🐹" },
    [PetSpecies.TURTLE]: { label: "Tortuga", color: "#68f312", icon: "🐢" },
    [PetSpecies.IGUANA]: { label: "Iguana", color: "#006815", icon: "🦎" },
    [PetSpecies.SNAKE]: { label: "Serpiente", color: "#48936e", icon: "🐍" },
    [PetSpecies.FROG]: { label: "Rana", color: "#5aff78", icon: "🐸" }
};
 
export const generateFoundPetEmailTemplate = (foundPet: FoundPetCDto): string => {
    const imageUrl = generateMapboxImage(foundPet.lat, foundPet.lon);
    const speciesInfo = petSpeciesLabels[foundPet.species] ?? { label: "Desconocido", color: "#000000" };
    const date = new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
    const foundDate = new Date(foundPet.found_date).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
 
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>

    <body style="margin:0;padding:0;background-color:#eef2f7;font-family:Arial,Helvetica,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
        <tr>
        <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
        <td style="background:${speciesInfo.color};padding:28px 36px;color:white;">
        <h1 style="margin:0;font-size:24px;display:flex;align-items:center;gap:10px;">
        <span style="
            display:inline-block;
            width:36px;
            height:36px;
            border-radius:50%;
            background-color:rgba(255,255,255,0.25);
            text-align:center;
            line-height:36px;
            font-size:18px;
        ">
            🐾
        </span>
        Mascota Encontrada
        </h1>
        <p style="margin:6px 0 6px;font-size:14px;opacity:0.9;">
        Se ha reportado una mascota encontrada en el sistema
        </p>
        <span style="
        background:white;
        color:${speciesInfo.color};
        padding:6px 16px;
        border-radius:20px;
        font-size:13px;
        font-weight:bold;">
        ${speciesInfo.icon} ${speciesInfo.label}
        </span>
        </td>
        </tr>

        <!-- Photo -->
        <tr>
        <td style="padding:24px 36px 0;">
        <img src="${foundPet.photo_url}" 
        style="width:100%;border-radius:10px;display:block;" 
        alt="Foto de la mascota"/>
        </td>
        </tr>

        <!-- Pet Info -->
        <tr>
        <td style="padding:24px 36px;">
        <h2 style="margin:0 0 16px;font-size:16px;color:#6b7280;text-transform:uppercase;">
        Información de la mascota
        </h2>

        <table width="100%" cellpadding="0" cellspacing="0">

        <tr>
        <td style="padding:6px 0;font-size:14px;color:#374151;">
        <b>Especie:</b> ${foundPet.species}
        </td>
        </tr>

        <tr>
        <td style="padding:6px 0;font-size:14px;color:#374151;">
        <b>Raza:</b> ${foundPet.breed || "No especificada"}
        </td>
        </tr>

        <tr>
        <td style="padding:6px 0;font-size:14px;color:#374151;">
        <b>Color:</b> ${foundPet.color}
        </td>
        </tr>

        <tr>
        <td style="padding:6px 0;font-size:14px;color:#374151;">
        <b>Tamaño:</b> ${foundPet.size}
        </td>
        </tr>

        </table>
        </td>
        </tr>

        <!-- Description -->
        <tr>
        <td style="padding:0 36px 24px;">
        <h2 style="margin:0 0 10px;font-size:16px;color:#6b7280;text-transform:uppercase;">
        Descripción
        </h2>

        <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">
        ${foundPet.description}
        </p>

        </td>
        </tr>

        <!-- Finder -->
        <tr>
        <td style="padding:0 36px 24px;">

        <table width="100%" cellpadding="0" cellspacing="0"
        style="background:#f9fafb;border-radius:10px;padding:18px;">

        <tr>
        <td style="font-size:16px;font-weight:bold;color:#374151;padding-bottom:10px;">
        Persona que encontró la mascota
        </td>
        </tr>

        <tr>
        <td style="font-size:14px;color:#374151;">
        <b>Nombre:</b> ${foundPet.finder_name}
        </td>
        </tr>

        <tr>
        <td style="font-size:14px;color:#374151;">
        <b>Email:</b> ${foundPet.finder_email}
        </td>
        </tr>

        <tr>
        <td style="font-size:14px;color:#374151;">
        <b>Teléfono:</b> ${foundPet.finder_phone}
        </td>
        </tr>

        </table>

        </td>
        </tr>

        <!-- Found Date -->
        <tr>
        <td style="padding:0 36px 24px;">

        <h2 style="margin:0 0 10px;font-size:16px;color:#6b7280;text-transform:uppercase;">
        Fecha en que se encontró
        </h2>

        <p style="margin:0;font-size:14px;color:#374151;">
        ${foundDate}
        </p>

        </td>
        </tr>

        <!-- Location -->
        <tr>
        <td style="padding:0 36px 24px;">

        <h2 style="margin:0 0 10px;font-size:16px;color:#6b7280;text-transform:uppercase;">
        Ubicación donde se encontró
        </h2>

        <p style="margin:0;font-size:14px;color:#374151;">
        ${foundPet.address}
        </p>

        <p style="margin:6px 0 0;font-size:13px;color:#6b7280;">
        Lat: ${foundPet.lat} | Lon: ${foundPet.lon}
        </p>

        </td>
        </tr>

        <!-- Map -->
        <tr>
        <td style="padding:0 36px 24px;">
        <img src="${imageUrl}" 
        style="width:100%;border-radius:10px;" 
        alt="Mapa ubicación"/>
        </td>
        </tr>

        <!-- Footer -->
        <tr>
        <td style="padding:20px 36px;background:#f3f4f6;font-size:12px;color:#6b7280;">

        <p style="margin:0;">
        Reporte generado el ${date}
        </p>

        <p style="margin:4px 0 0;">
        Sistema de Mascotas Perdidas
        </p>

        </td>
        </tr>

        </table>

        </td>
        </tr>
        </table>
    </body>
    </html>
    `;
}
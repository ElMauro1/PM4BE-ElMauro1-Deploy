import { Module } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryRepository } from "./cloudinary.repository";
import { CloudinaryController } from "./cloudinary.controller";
// Importamos la configuración que definimos en la carpeta config/
import { CloudinaryConfig } from "../config/cloudinary.config"; 

@Module({
  controllers: [CloudinaryController],
  providers: [
    CloudinaryService, 
    CloudinaryRepository,
    // Registramos el proveedor de configuración de Cloudinary
    CloudinaryConfig, 
  ],
  // Exportamos CloudinaryService para que otros módulos puedan usarlo (si es necesario)
  exports: [CloudinaryService], 
})
export class CloudinaryModule {
  // ELIMINAMOS EL CONSTRUCTOR MANUAL. La configuración la maneja el proveedor CloudinaryConfig.
}

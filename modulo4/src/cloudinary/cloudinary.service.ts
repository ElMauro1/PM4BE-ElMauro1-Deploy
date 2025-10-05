import { Injectable } from "@nestjs/common";
import { UploadApiResponse } from "cloudinary";
import { Express } from "express";
import { CloudinaryRepository } from "./cloudinary.repository";

@Injectable()
export class CloudinaryService {
  constructor(private readonly cloudinaryRepository: CloudinaryRepository) {}

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    // Aquí podrías agregar lógica de validación de tipo de archivo
    // Ejemplo: solo permitir imágenes o pdf
    const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf", "image/webp"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new Error("Formato no permitido. Solo JPG, PNG o PDF.");
    }

    return await this.cloudinaryRepository.uploadImage(file);
  }
}

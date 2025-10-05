import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { Express } from "express";

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  private readonly allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

  transform(file: Express.Multer.File) {
    if (!this.allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Tipo de archivo no permitido. Solo se permiten: ${this.allowedTypes.join(", ")}`
      );
    }
    return file;
  }
}

import { PipeTransform, BadRequestException } from "@nestjs/common";
import { Express } from "express";

export class FileSizeValidationPipe implements PipeTransform {
  constructor(private readonly maxSizeKB = 200) {}

  transform(file: Express.Multer.File) {
    const maxSizeBytes = this.maxSizeKB * 1024;
    if (file.size > maxSizeBytes) {
      throw new BadRequestException(
        `El archivo excede el tamaño máximo permitido de ${this.maxSizeKB}KB`,
      );
    }
    return file;
  }
}

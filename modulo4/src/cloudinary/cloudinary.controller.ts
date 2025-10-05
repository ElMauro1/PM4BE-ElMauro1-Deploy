import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "./cloudinary.service";
import { UploadApiResponse } from "cloudinary";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Cloudinary')
@Controller("cloudinary")
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file")) // "file" es el nombre del campo en el form-data
  async uploadFile(
    @UploadedFile() file: Express.Multer.File
  ): Promise<UploadApiResponse> {
    return this.cloudinaryService.uploadImage(file);
  }
}

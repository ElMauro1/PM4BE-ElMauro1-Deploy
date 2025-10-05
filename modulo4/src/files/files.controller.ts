import {
  Controller,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesService } from "./files.service";
import { UploadApiResponse } from "cloudinary";
import { FileSizeValidationPipe } from "./pipes/fileSizeValidation.pipe";
import { FileTypeValidationPipe } from "./pipes/fileTypeValidation.pipe";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Files')
@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post("uploadImage/:id")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file")) 
  async uploadImage(
    @Param("id") id: string,
    @UploadedFile(new FileSizeValidationPipe(200), FileTypeValidationPipe) file: Express.Multer.File
  ): Promise<UploadApiResponse> {
    return this.filesService.uploadProductImage(id, file);
  }
}

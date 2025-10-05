import { Injectable, NotFoundException } from "@nestjs/common";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/products.entity"; 
import { UploadApiResponse } from "cloudinary";

@Injectable()
export class FilesService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async uploadProductImage(
    productId: string, 
    file: Express.Multer.File
  ): Promise<UploadApiResponse> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Producto con id ${productId} no encontrado`);
    }

    const uploadedImage = await this.cloudinaryService.uploadImage(file);
    
    product.imgUrl = uploadedImage.secure_url; 
    await this.productRepository.save(product);

    return uploadedImage;
  }
}

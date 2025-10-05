import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDTO {
    @ApiProperty({ example: "Laptop Dell XPS 13" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: "Ultrabook con pantalla táctil y procesador Intel i7" })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 1200.99 })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ example: true })
    @IsBoolean()
    @IsNotEmpty()
    stock: boolean;

    @ApiProperty({ example: "https://example.com/image.jpg" })
    @IsString()
    imgUrl: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    categoryId: number; 
}

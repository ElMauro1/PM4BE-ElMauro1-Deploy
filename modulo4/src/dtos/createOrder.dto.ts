import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class ProductDto {
    @ApiProperty({ example: "f2a7c8f2-4b52-4d36-a38d-7a3f9c9b6f11" })
    @IsUUID()
    @IsNotEmpty()
    id: string;
}

export class CreateOrderDto {
    @ApiProperty({ example: "e1b57c98-1a02-4f2f-a1e3-6b64bda6a5c2" })
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ type: [ProductDto] })
    @IsArray()
    @ValidateNested({ each: true})
    @Type(()=> ProductDto)
    products: ProductDto[];
}

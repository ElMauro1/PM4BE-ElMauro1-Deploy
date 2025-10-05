import { IsEmail, IsNotEmpty, IsString, Length, Matches, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignupDto {
  @ApiProperty({ example: "usuario@email.com" })
  @IsEmail({}, {message: "El correo electronico no es valido"})
  @IsNotEmpty()
  email: string;    
  
  @ApiProperty({ example: "Laura Rico" })
  @IsString()
  @IsNotEmpty() 
  @Length(3, 80, {message: "El nombre debe tener entre 3 y 80 caracteres."})      
  name: string;  
  
  @ApiProperty({ example: "Password123!" })
  @IsString()
  @IsNotEmpty()
  @Length(8, 15, {message : "La contraseña debe tener entre 8 y 15 caracteres."})
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
      message: "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*)."
  })
  password: string;
  
  @ApiProperty({ example: "Password123!" })
  @IsString()
  @IsNotEmpty()
  @Length(8, 15, {message : "La contraseña debe tener entre 8 y 15 caracteres."})
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
      message: "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*)."
  })
  confirmPassword: string;

  @ApiProperty({ example: "Calle 123 #45-67" })
  @IsString()
  @IsNotEmpty()
  @Length(3, 80, { message: "La dirección debe tener entre 3 y 80 caracteres." })
  address: string;
  
  @ApiProperty({ example: 3101234567 })
  @IsNumber({}, {message: "El telefono debe ser un numero."})
  @IsNotEmpty()
  phone: number;     

  @ApiProperty({ example: "Colombia" })
  @IsString()
  @IsNotEmpty()
  @Length(5, 20, { message: "El país debe tener entre 5 y 20 caracteres." })
  country: string;
  
  @ApiProperty({ example: "Bogotá" })
  @IsString()
  @IsNotEmpty()
  @Length(5, 20, { message: "La ciudad debe tener entre 5 y 20 caracteres." })
  city: string;
}

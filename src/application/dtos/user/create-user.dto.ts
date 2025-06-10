import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: "Email debe ser válido" })
  @IsString({ message: "Email debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El email es requerido" })
  email!: string;
}
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString({ message: 'El título debe ser string' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser string' })
  description?: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo completed debe ser booleano' })
  completed?: boolean;
}
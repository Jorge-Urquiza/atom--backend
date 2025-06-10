import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'El título debe ser string' })
  @IsNotEmpty({ message: 'El título es requerido' })
  title!: string;

  @IsString({ message: 'El título debe ser string' })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description!: string;
}

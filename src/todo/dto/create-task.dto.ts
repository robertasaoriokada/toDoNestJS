import { ValidationPipe } from "@nestjs/common";
import { IsBoolean, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateTaskDTO extends ValidationPipe {
  @IsNotEmpty({message: "Uma task precisa ter um título"})
  title: string;
  @MinLength(3, {message: "Uma task deve ter no mínimo 3 caracteres de descrição"})
  description: string;
  @IsOptional()
  @IsBoolean({message: "Task precisa ter sido concluída ou não com um valor booleano"})
  is_complete?: boolean;
}
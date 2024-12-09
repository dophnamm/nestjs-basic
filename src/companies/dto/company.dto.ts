import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CompanyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  description: string;
}

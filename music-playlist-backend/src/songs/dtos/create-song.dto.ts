import { IsString, IsNumber, IsOptional, Min, IsUrl } from 'class-validator';

export class CreateSongDto {
  @IsString()
  title: string;

  @IsString()
  artist: string;

  @IsString()
  @IsOptional()
  album?: string;

  @IsNumber()
  @Min(1)
  duration: number;

  @IsNumber()
  @IsOptional()
  releaseYear?: number;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsUrl()
  @IsOptional()
  coverImage?: string;

  @IsUrl()
  @IsOptional()
  previewUrl?: string;

  @IsString()
  @IsOptional()
  externalId?: string;
}
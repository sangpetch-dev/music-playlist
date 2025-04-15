import { IsString, IsNumber, IsOptional } from 'class-validator';

export class AddSongDto {
  @IsString()
  songId: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}
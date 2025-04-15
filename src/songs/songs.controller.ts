import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
  } from '@nestjs/common';
  import { SongsService } from './songs.service';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSongDto } from './dtos/create-song.dto';
import { UpdateSongDto } from './dtos/update-song.dto';
  
  @Controller('songs')
  export class SongsController {
    constructor(private readonly songsService: SongsService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createSongDto: CreateSongDto) {
      return this.songsService.create(createSongDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
      return this.songsService.findAll();
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('search')
    search(
      @Query('query') query: string,
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 20,
    ) {
      return this.songsService.search(query, page, limit);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('trending')
    getTrending(@Query('limit') limit: number = 10) {
      return this.songsService.getTrending(limit);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.songsService.findOne(id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
      return this.songsService.update(id, updateSongDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.songsService.remove(id);
    }
  
    // Special endpoint for seeding the database with sample songs
    // This would typically be protected or removed in production
    @Post('seed')
    seedSongs(@Body() songs: CreateSongDto[]) {
      return this.songsService.seedSongs(songs);
    }
  }
  
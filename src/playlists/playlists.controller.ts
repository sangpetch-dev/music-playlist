import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { PlaylistsService } from './playlists.service';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddSongDto } from './dtos/add-song.dto';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';
import { UpdatePlaylistDto } from './dtos/update-playlist.dto';
  
  @UseGuards(JwtAuthGuard)
  @Controller('playlists')
  export class PlaylistsController {
    constructor(private readonly playlistsService: PlaylistsService) {}
  
    @Post()
    create(@Body() createPlaylistDto: CreatePlaylistDto, @Request() req) {
      return this.playlistsService.create(createPlaylistDto, req.user.id);
    }
  
    @Get()
    findAll(@Request() req) {
      return this.playlistsService.findAll(req.user.id);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.playlistsService.findOne(id, req.user.id);
    }
  
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updatePlaylistDto: UpdatePlaylistDto,
      @Request() req,
    ) {
      return this.playlistsService.update(id, updatePlaylistDto, req.user.id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.playlistsService.remove(id, req.user.id);
    }
  
    @Post(':id/songs')
    addSong(
      @Param('id') id: string,
      @Body() addSongDto: AddSongDto,
      @Request() req,
    ) {
      return this.playlistsService.addSong(id, addSongDto, req.user.id);
    }
  
    @Delete(':id/songs/:songId')
    removeSong(
      @Param('id') id: string,
      @Param('songId') songId: string,
      @Request() req,
    ) {
      return this.playlistsService.removeSong(id, songId, req.user.id);
    }
  }
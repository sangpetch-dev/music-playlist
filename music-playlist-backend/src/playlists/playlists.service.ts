import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AddSongDto } from './dtos/add-song.dto';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';
import { UpdatePlaylistDto } from './dtos/update-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPlaylistDto: CreatePlaylistDto, userId: string) {
    return this.prisma.playlist.create({
      data: {
        ...createPlaylistDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.playlist.findMany({
      where: {
        userId,
      },
      include: {
        _count: {
          select: {
            songs: true,
          },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const playlist = await this.prisma.playlist.findUnique({
      where: { id },
      include: {
        songs: {
          include: {
            song: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }

    // Check if the playlist belongs to the user
    if (playlist.userId !== userId) {
      throw new ForbiddenException('You do not have permission to access this playlist');
    }

    return playlist;
  }

  async update(id: string, updatePlaylistDto: UpdatePlaylistDto, userId: string) {
    // Check if playlist exists and belongs to the user
    await this.findOne(id, userId);

    return this.prisma.playlist.update({
      where: { id },
      data: updatePlaylistDto,
    });
  }

  async remove(id: string, userId: string) {
    // Check if playlist exists and belongs to the user
    await this.findOne(id, userId);

    await this.prisma.playlist.delete({
      where: { id },
    });

    return { message: 'Playlist deleted successfully' };
  }

  async addSong(playlistId: string, addSongDto: AddSongDto, userId: string) {
    // Check if playlist exists and belongs to the user
    const playlist = await this.findOne(playlistId, userId);

    // Check if song exists
    const song = await this.prisma.song.findUnique({
      where: { id: addSongDto.songId },
    });

    if (!song) {
      throw new NotFoundException(`Song with ID ${addSongDto.songId} not found`);
    }

    // Check if song is already in the playlist
    const existingSong = playlist.songs.find(s => s.songId === addSongDto.songId);
    if (existingSong) {
      return { message: 'Song already exists in the playlist' };
    }

    // Calculate order if not provided
    const order = addSongDto.order || playlist.songs.length + 1;

    // Add song to playlist
    await this.prisma.playlistSong.create({
      data: {
        playlistId,
        songId: addSongDto.songId,
        order,
      },
    });

    return { message: 'Song added to playlist successfully' };
  }

  async removeSong(playlistId: string, songId: string, userId: string) {
    // Check if playlist exists and belongs to the user
    await this.findOne(playlistId, userId);

    // Remove song from playlist
    await this.prisma.playlistSong.delete({
      where: {
        playlistId_songId: {
          playlistId,
          songId,
        },
      },
    });

    // Reorder remaining songs
    const playlistSongs = await this.prisma.playlistSong.findMany({
      where: { playlistId },
      orderBy: { order: 'asc' },
    });

    // Update order of each song
    await Promise.all(
      playlistSongs.map((song, index) =>
        this.prisma.playlistSong.update({
          where: {
            id: song.id,
          },
          data: {
            order: index + 1,
          },
        })
      )
    );

    return { message: 'Song removed from playlist successfully' };
  }
}
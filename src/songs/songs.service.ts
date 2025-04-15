import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateSongDto } from './dtos/create-song.dto';
import { UpdateSongDto } from './dtos/update-song.dto';

@Injectable()
export class SongsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSongDto: CreateSongDto) {
    return this.prisma.song.create({
      data: createSongDto,
    });
  }

  async findAll() {
    return this.prisma.song.findMany();
  }

  async findOne(id: string) {
    const song = await this.prisma.song.findUnique({
      where: { id },
    });

    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }

    return song;
  }

  async update(id: string, updateSongDto: UpdateSongDto) {
    await this.findOne(id);

    return this.prisma.song.update({
      where: { id },
      data: updateSongDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.song.delete({
      where: { id },
    });

    return { message: 'Song deleted successfully' };
  }

  async search(query: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const songs = await this.prisma.song.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { artist: { contains: query, mode: 'insensitive' } },
          { album: { contains: query, mode: 'insensitive' } },
        ],
      },
      skip,
      take: limit,
    });

    const total = await this.prisma.song.count({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { artist: { contains: query, mode: 'insensitive' } },
          { album: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    return {
      songs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getTrending(limit: number = 10) {
    return this.prisma.song.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async seedSongs(songs: CreateSongDto[]) {
    if (process.env.NODE_ENV === 'production') {
      return { message: 'Seeding is not allowed in production' };
    }

    const createdSongs = await Promise.all(
      songs.map(song => this.prisma.song.create({ data: song }))
    );

    return { 
      message: `Successfully seeded ${createdSongs.length} songs`,
      count: createdSongs.length
    };
  }
}
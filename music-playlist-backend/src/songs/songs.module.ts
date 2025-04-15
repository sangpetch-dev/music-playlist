import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ExternalSearchService } from './services/external-search.service';

@Module({
  imports: [PrismaModule],
  controllers: [SongsController],
  providers: [SongsService, ExternalSearchService],
  exports: [SongsService],
})
export class SongsModule {}
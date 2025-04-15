import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string; status: string; timestamp: string } {
    return {
      message: 'Welcome to Music Playlist API',
      status: 'active',
      timestamp: new Date().toISOString(),
    };
  }
}
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  sendHello(io: Server) {
    console.log('io==->', io);
    io.emit('events', 'set emit hello');
  }
}

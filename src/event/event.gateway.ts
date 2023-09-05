import {
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
// import * as WebSocket from 'ws';
import { Server } from 'socket.io';
import { AppService } from '../app.service';

@WebSocketGateway({
  // transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class EventGateway {
  constructor(private appService: AppService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Server,
  ): any {
    // console.log('client-->', client);
    console.log(data);
    this.server.send('my message');
    return { data: 'hello websocket!', event: 'events' }; //event: 'events', 可以被前端监听到
  }

  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Server,
  ): any {
    this.appService.sendHello(this.server);
    return data;
    // return { data, event: 'events' };
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from '../user/user.service';
import { EventGateway } from '../event/event.gateway';
@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private userService: UserService,
    private eventGatewayver: EventGateway,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    this.logger.debug('Called when every five seconds');
    this.eventGatewayver.server.emit('events', 'aaa');
    this.userService.taskFn();
  }
}

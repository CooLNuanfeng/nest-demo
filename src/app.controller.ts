import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('set')
  setString(@Query('str') str: string) {
    this.userService.setA(str);
    return { success: true };
  }

  @Get('get')
  getString(): string {
    return this.userService.getA();
  }
}

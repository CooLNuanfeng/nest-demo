import { Controller, Query, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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

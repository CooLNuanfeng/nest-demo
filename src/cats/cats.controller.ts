import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  UsePipes,
  UseFilters,
  UseGuards,
  ForbiddenException,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { JoiValidationPipe } from './validation.pipe';
import { HttpExceptionFilter } from './http-exception.filter';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../roles/roles.guard';
import { Public } from '../auth/public.decorator';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { LogDateInterceptor } from 'src/log-date/log-date.interceptor';
import { TransformInterceptor } from './transform.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LogDateInterceptor)
@UseInterceptors(TransformInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createCatSchema))
  // @Roles(Role.User)
  @Roles(Role.Admin) //admin 角色可以调用
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
    return true;
  }

  @Get()
  @Public() //跳过token认证
  @UseFilters(new HttpExceptionFilter())
  async findAll(@Req() request: Request): Promise<Cat[]> {
    // console.log(request);
    return this.catsService.findAll();
  }

  @Get('/byId')
  @Roles(Role.User) //仅 user 角色可以访问
  @UseGuards(AuthGuard)
  async findOne(@Query('id') id: string) {
    console.log(typeof id);
    console.log(id);
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.catsService.findOne(id);
  }
}

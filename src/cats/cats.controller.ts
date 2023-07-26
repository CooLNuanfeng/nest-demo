import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  UsePipes,
  UseFilters,
  ForbiddenException,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { JoiValidationPipe } from './validation.pipe';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createCatSchema))
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
    return true;
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async findAll(): Promise<Cat[]> {
    throw new ForbiddenException();
    return this.catsService.findAll();
  }

  @Get('/byId')
  async findOne(@Query('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.catsService.findOne(id);
  }
}

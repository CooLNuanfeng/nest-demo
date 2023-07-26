import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  constructor(private configService: ConfigService) {}

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
  findOne(id: number): Cat {
    console.log(id);
    console.log(this.configService.get('HELLO_MESSAGE'));
    return {
      name: 'aa',
      age: 2,
      breed: 'true',
    };
  }
}

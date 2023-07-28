import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { ConfigService } from '../config/config.service';
import { LazyModuleLoader, ModuleRef } from '@nestjs/core';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  constructor(
    private moduleRef: ModuleRef,
    private configService: ConfigService,
    private lazyModuleLoder: LazyModuleLoader,
  ) {}

  create(cat: Cat) {
    this.cats.push(cat);
  }

  async findAll(): Promise<Cat[]> {
    const { LazyService } = await import('../lazy/lazy.service');
    const lazyService = this.moduleRef.get(LazyService, { strict: false });
    lazyService.lazyLoad();
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

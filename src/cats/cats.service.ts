import { Model, Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Cat } from '../schemas/cat.schema';
// import { Cat } from './interfaces/cat.interface';
import { ConfigService } from '../config/config.service';
import { LazyModuleLoader, ModuleRef } from '@nestjs/core';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  constructor(
    @InjectModel(Cat.name) private catModel: Model<Cat>,
    // @InjectConnection() private connection: Connection,
    private moduleRef: ModuleRef,
    private configService: ConfigService,
    private lazyModuleLoder: LazyModuleLoader,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    // this.cats.push(cat);
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    const { LazyService } = await import('../lazy/lazy.service');
    const lazyService = this.moduleRef.get(LazyService, { strict: false });
    lazyService.lazyLoad();
    // return this.cats;
    return this.catModel.find().exec();
  }
  findOne(id: string): Promise<Cat> {
    console.log(id);
    console.log(this.configService.get('HELLO_MESSAGE'));
    // return {
    //   name: 'aa',
    //   age: 2,
    //   breed: 'true',
    // };
    return this.catModel.findById(id);
  }
}

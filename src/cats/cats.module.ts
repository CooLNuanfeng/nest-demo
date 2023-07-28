import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { ConfigModule } from 'src/config/config.module';
import { UserModule } from 'src/user/user.module';
import { Cat, CatSchema } from '../schemas/cat.schema';
@Module({
  imports: [
    UserModule,
    ConfigModule.register({ folder: './configs' }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {
  // constructor(
  //   private catsService: CatsService,
  //   private configService: ConfigService,
  // ) {}
}

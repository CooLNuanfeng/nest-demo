import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { ConfigModule } from 'src/config/config.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, ConfigModule.register({ folder: './configs' })],
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

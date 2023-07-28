import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
// import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LogMiddleware } from './log/log.middleware';
import { ConfigModule } from './config/config.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { LazyModule } from './lazy/lazy.module';

@Module({
  imports: [
    CatsModule,
    AuthModule,
    UserModule,
    LazyModule,
    ConfigModule.register({ folder: './configs' }),
    // DevtoolsModule.register({
    //   http: process.env.NODE_ENV !== 'production',
    // }),
  ],
  controllers: [AppController, UserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
    UserService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('cats');
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseConnectionService } from './database/connection.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (database: DatabaseConnectionService) => {
        return <MongooseModuleOptions>{
          uri: database.get(),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [DatabaseConnectionService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

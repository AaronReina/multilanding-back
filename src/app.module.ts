import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { DataBaseConfig } from './config/dataBseConfig';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true, load:[typeOrmConfig]}),
    TypeOrmModule.forRootAsync({useClass:DataBaseConfig, imports:[ConfigModule]})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

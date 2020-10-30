import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { DataBaseConfig } from './config/dataBseConfig';
import { Users } from './entities/users.entity';
import { Images } from './entities/images.entity';
import { Colors } from './entities/colors.entity';
import { Text } from './entities/text.entity';

@Module({
  imports: [

    ConfigModule.forRoot({isGlobal:true, load:[typeOrmConfig]}),
    TypeOrmModule.forRootAsync({useClass:DataBaseConfig, imports:[ConfigModule]}),
    TypeOrmModule.forFeature([Users, Text, Images, Colors])

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

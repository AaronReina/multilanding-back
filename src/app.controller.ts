import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Users } from './entities/users.entity';
import { Text } from './entities/text.entity';
import { Config } from './entities/config.entity';
import { Colors } from './entities/colors.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  login(@Body() user: Users): Promise<unknown> {
    return this.appService.login(user);
  }

  @Post('changeText')
  changeText(@Body() text: Text): Promise<unknown> {
    return this.appService.changeText(text);
  }

  @Post('changeConfig')
  changeConfig(@Body() config: Config): Promise<unknown> {
    return this.appService.changeConfig(config);
  }

  @Post('changeImage')
  @UseInterceptors(FileInterceptor('file'))
  changeImage(@UploadedFile() file, @Body() data: unknown) {
    return this.appService.changeImage(data, file);
  }

  @Post('changeColors')
  changeColors(@Body() color: Colors): Promise<unknown> {
    return this.appService.changeColors(color);
  }

  @Get('colors')
  getColors(): Promise<any[]> {
    return this.appService.getColors();
  }

  @Get('config')
  getConfig(): Promise<any[]> {
    return this.appService.getConfig();
  }

  @Get('images')
  getImages(): Promise<unknown> {
    return this.appService.getImages();
  }
  @Get('text')
  getText(): Promise<any[]> {
    return this.appService.getText();
  }
}

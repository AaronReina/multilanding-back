import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { Images } from './entities/images.entity';
import { Text } from './entities/text.entity';
import { Colors } from './entities/colors.entity';
import { Config } from './entities/config.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    @InjectRepository(Colors)
    private colorRepository: Repository<Colors>,

    @InjectRepository(Images)
    private imagesRepository: Repository<Images>,

    @InjectRepository(Text)
    private textRepository: Repository<Text>,

    @InjectRepository(Config)
    private configRepository: Repository<Config>,
  ) {}

  async login(users: Users): Promise<unknown> {
    const { username, password } = users;
    if (!username || !password) {
      throw new BadRequestException();
    }
    const userSelected = await this.usersRepository.findOne({
      where: { username: username },
    });
    if (userSelected) {
      console.log(await bcrypt.hash(password, 10));
      const accessOk = await bcrypt.compare(password, userSelected.password);
      if (accessOk) {
        return { access: userSelected.access, ok: true };
      } else {
        throw new UnauthorizedException();
      }
    }
    throw new UnauthorizedException();
  }

  async changeImage(data, file): Promise<unknown> {
    const { id, fileName } = data;
    const baseImage = Buffer.from(file.buffer).toString('base64');
    const updateInfo = {
      info: fileName,
      image: baseImage,
    };
    try {
      const response = await this.imagesRepository.update(id, updateInfo);
      return response;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async changeColors(colors: Colors): Promise<unknown> {
    const { id, color } = colors;
    if (!id || !color) {
      throw new BadRequestException();
    }
    try {
      await this.colorRepository.update(id, colors);
      return { ok: true };
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async changeText(text: Text): Promise<unknown> {
    const { id, htmlText } = text;
    if (!id || !htmlText) {
      throw new BadRequestException();
    }
    try {
      await this.textRepository.update(id, text);
      return { ok: true };
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async changeConfig(config: Config): Promise<unknown> {
    console.log(config);
    return console.log(config);
    // if (!id || !htmlText) {
    //   throw new BadRequestException();
    // }
    // try {
    //   await this.textRepository.update(id, text);
    //   return { ok: true };
    // } catch {
    //   throw new InternalServerErrorException();
    // }
  }

  async getConfig(): Promise<any[]> {
    try {
      const selection = await this.configRepository.find();
      return selection;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async getColors(): Promise<any[]> {
    try {
      const selection = await this.colorRepository.find();
      return selection;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async getText(): Promise<any[]> {
    try {
      const selection = await this.textRepository.find();
      return selection;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async getImages(): Promise<any[]> {
    try {
      const selection = await this.imagesRepository.find();
      if (selection) {
        selection.forEach(e => {
          if (e.image) {
            e.image = e.image.toString();
          }
        });
      }
      return selection;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}

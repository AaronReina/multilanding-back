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
      const accessOk = await bcrypt.compare(password, userSelected.password);
      if (accessOk) {
        return { access: userSelected.access, ok: true };
      } else {
        throw new UnauthorizedException();
      }
    }
    throw new UnauthorizedException();
  }

  async changeImage(images: Images): Promise<unknown> {
    const { id, info, image } = images;
    if (!id || !info || !image) {
      throw new BadRequestException();
    }
    try {
      await this.imagesRepository.update(id, images);
      return { ok: true };
    } catch {
      throw new InternalServerErrorException();
    }
    // await this.imagesRepository.save(images)
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
      return selection;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}

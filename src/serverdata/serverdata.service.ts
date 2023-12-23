import { Injectable } from '@nestjs/common';
import { CreateServerdatumDto } from './dto/create-serverdatum.dto';
import { UpdateServerdatumDto } from './dto/update-serverdatum.dto';

@Injectable()
export class ServerdataService {
  create(createServerdatumDto: CreateServerdatumDto) {
    return 'This action adds a new serverdatum';
  }

  findAll() {
    return `This action returns all serverdata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serverdatum`;
  }

  update(id: number, updateServerdatumDto: UpdateServerdatumDto) {
    return `This action updates a #${id} serverdatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} serverdatum`;
  }
}

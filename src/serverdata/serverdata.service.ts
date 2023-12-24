import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Serverdata } from './Schema/Serverdata'
import { CreateServerdatumDto } from './dto/create-serverdatum.dto'
import { UpdateServerdatumDto } from './dto/update-serverdatum.dto'

@Injectable()
export class ServerdataService {
  constructor(
    @InjectModel(Serverdata.name)
    private readonly serverdataModel: Model<Serverdata>
  ) {}
  create(createServerdatumDto: CreateServerdatumDto) {
    return this.serverdataModel.create(createServerdatumDto)
  }

  findAll() {
    return `This action returns all serverdata`
  }

  findOne(id: number) {
    return `This action returns a #${id} serverdatum`
  }

  update(id: number, updateServerdatumDto: UpdateServerdatumDto) {
    return `This action updates a #${id} serverdatum`
  }

  remove(id: number) {
    return `This action removes a #${id} serverdatum`
  }
}

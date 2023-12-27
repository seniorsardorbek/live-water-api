import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './Schema/Users'
import { Model, ObjectId } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { PaginationResponse } from 'src/_shared/response'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
const saltOrRounds = 12
@Injectable()
export class UsersService {
  constructor (@InjectModel(User.name) private userModel: Model<User>) {}
  async create (data: CreateUserDto) {
    data.password = await bcrypt.hash(data.password, saltOrRounds)
    return this.userModel.create(data)
  }

  async findAll ({ page, q }: QueryDto): Promise<PaginationResponse<User>> {
    const { limit = 10, offset = 0 } = page || {}
    const search = q
      ? {
          username: {
            $regex: q,
            $options: 'i',
          },
        }
      : {}

    const total = await this.userModel.find({ ...search }).countDocuments()

    const data = await this.userModel
      .find({ ...search })
      .populate([{ path: 'devices', select: 'port serie ip_address -owner' }])
      .select('-password')
      .limit(limit)
      .skip(limit * offset)
    return { data, limit, offset, total }
  }

  findOne ({ id }: ParamIdDto) {
    const user = this.userModel
      .findById(id)
      .populate([{ path: 'devices', select: 'port serie ip_address -owner' }])
      .select('-password')
    return user
  }

  async update ({ id }: ParamIdDto, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10)
    }
    const updated = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    })
    if (!updated) {
      throw new BadRequestException({ msg: 'Foydalanuvchi mavjud emas.' })
    } else {
      return { msg: 'Muvaffaqqiyatli yangilandi.' }
    }
  }

  async remove ({ id }: ParamIdDto) {
    const removed = await this.userModel.findByIdAndDelete(id)
    if (!removed) {
      throw new BadRequestException({ msg: 'Foydalanuvchi mavjud emas.' })
    } else {
      return { msg: "Muvaffaqqiyatli o'chirildi." }
    }
  }
}

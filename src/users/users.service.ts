import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schema/Users';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
const saltOrRounds = 12
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }
  async create(data: CreateUserDto) {
    data.password = await bcrypt.hash(data.password, saltOrRounds);
    return this.userModel.create(data)
  }

  findAll() {
    return this.userModel.find().populate([{path :'devices' , select :'port serie ip_address -owner'}]).select('-password');;
  }

  findOne(id: string) {
    return this.userModel.findById(id).populate([{path :'devices' , select :'port serie ip_address -owner'}]).select('-password');
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updated = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!updated) {
      throw new BadRequestException({ msg: "Foydalanuvchi mavjud emas." })
    }
    else {
      return { msg: "Muvaffaqqiyatli yangilandi." }
    }
  }

  async remove(id: string) {
    const removed = await this.userModel.findByIdAndDelete(id);
    if (!removed) {
      throw new BadRequestException({ msg: "Foydalanuvchi mavjud emas." })
    }
    else {
      return { msg: "Muvaffaqqiyatli o'chirildi." }
    }
  }
}

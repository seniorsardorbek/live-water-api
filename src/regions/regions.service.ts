import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Model, ObjectId } from 'mongoose';
import { Region } from './Schema/Regions';
import { InjectModel } from '@nestjs/mongoose';
import { Device } from 'src/devices/Schema/Device';

@Injectable()
export class RegionsService {
  constructor(@InjectModel(Region.name) private regionModel: Model<Region>) { }
  create(data: CreateRegionDto) {
    return this.regionModel.create(data);
  }

  findAll() {
    return this.regionModel.find().populate('devicesCount')
  }

  async findOne(id: string) {
    const regionWithDevices = await this.regionModel.findById(id).populate('devicesCount')
    return regionWithDevices;
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    const updated = await this.regionModel.findByIdAndUpdate(id, updateRegionDto, { new: true });
    if (!updated) {
      throw new BadRequestException({ msg: "Foydalanuvchi mavjud emas." })
    }
    else {
      return { msg: "Muvaffaqqiyatli yangilandi." }
    }
  }

  async remove(id: string) {
    const removed = await this.regionModel.findByIdAndDelete(id);
    if (!removed) {
      throw new BadRequestException({ msg: "Hudud mavjud emas." })
    }
    else {
      return { msg: "Muvaffaqqiyatli o'chirildi." }
    }
  }
}

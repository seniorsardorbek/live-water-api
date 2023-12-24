import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateDeviceDto } from './dto/create-device.dto'
import { UpdateDeviceDto } from './dto/update-device.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Device } from './Schema/Device'
import { Model } from 'mongoose'

@Injectable()
export class DevicesService {
  constructor(@InjectModel(Device.name) private deviceModel: Model<Device>) {}
  create(createDeviceDto: CreateDeviceDto) {
    return this.deviceModel.create(createDeviceDto)
  }

  findAll() {
    return this.deviceModel.find().populate([
      { path: 'region', select: 'name' },
      { path: 'owner', select: 'username first_name last_name' },
    ])
  }

  findOne(id: string) {
    return this.deviceModel.findById(id).populate([
      { path: 'region', select: 'name' },
      { path: 'owner', select: 'username first_name last_name' },
    ])
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    const updated = await this.deviceModel.findByIdAndUpdate(
      id,
      updateDeviceDto,
      { new: true }
    )
    if (updated) {
      return { msg: 'Qurilma yangilandi.' }
    } else {
      throw new BadRequestException({ msg: 'Qurilmani yangilashda xatolik' })
    }
  }

  async remove(id: string) {
    const removed = await this.deviceModel.findByIdAndDelete(id, { new: true })
    if (removed) {
      return { msg: "Qurilma o'chirildi." }
    } else {
      throw new BadRequestException({ msg: 'Qurilmani ochirishda xatolik' })
    }
  }
}

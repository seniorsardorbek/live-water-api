import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateDeviceDto } from './dto/create-device.dto'
import { UpdateDeviceDto } from './dto/update-device.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Device } from './Schema/Device'
import { Model } from 'mongoose'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
import { PaginationResponse } from 'src/_shared/response'
import { DeviceQueryDto } from './dto/device.query.dto'

@Injectable()
export class DevicesService {
  constructor (@InjectModel(Device.name) private deviceModel: Model<Device>) {}
  create (createDeviceDto: CreateDeviceDto) {
    return this.deviceModel.create(createDeviceDto)
  }

  async findAll ({ page }: QueryDto): Promise<PaginationResponse<Device>> {
    const { limit = 10, offset = 0 } = page || {}

    const total = await this.deviceModel.find().countDocuments()

    const data = await this.deviceModel
      .find()
      .populate([
        { path: 'region', select: 'name' },
        { path: 'owner', select: 'username first_name last_name -password' },
      ])
      .limit(limit)
      .skip(limit * offset)
    return { data, limit, offset, total }
  }
  async regionAll (   { page , filter }: DeviceQueryDto): Promise<PaginationResponse<Device>> {
    console.log(filter);
    const { limit = 10, offset = 0 } = page || {}
    const total = await this.deviceModel.find().countDocuments()
    const data = await this.deviceModel
      .find(filter)
      .limit(limit)
      .skip(limit * offset)
    return { data, limit, offset, total }
  }

  findOne ({ id }: ParamIdDto) {
    return this.deviceModel.findById(id).populate([
      { path: 'region', select: 'name' },
      { path: 'owner', select: 'username first_name last_name' },
    ])
  }

  async update ({ id }: ParamIdDto, updateDeviceDto: UpdateDeviceDto) {
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

  async remove ({ id }: ParamIdDto) {
    const removed = await this.deviceModel.findByIdAndDelete(id, { new: true })
    if (removed) {
      return { msg: "Qurilma o'chirildi." }
    } else {
      throw new BadRequestException({ msg: 'Qurilmani ochirishda xatolik' })
    }
  }
}

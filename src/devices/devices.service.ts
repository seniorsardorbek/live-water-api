import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateDeviceDto } from './dto/create-device.dto'
import { UpdateDeviceDto } from './dto/update-device.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Device } from './Schema/Device'
import { Model } from 'mongoose'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
import { CustomRequest, PaginationResponse } from 'src/_shared/response'
import { DeviceQueryDto } from './dto/device.query.dto'

@Injectable()
export class DevicesService {
  constructor (@InjectModel(Device.name) private deviceModel: Model<Device>) {}
  async create (createDeviceDto: CreateDeviceDto) {
    const existKey = await this.deviceModel.findOne({
      device_privet_key: createDeviceDto.device_privet_key,
    })
    if (existKey) {
      throw new BadRequestException({
        msg: 'Device private key  already exists!',
      })
    }
    return this.deviceModel.create(createDeviceDto)
  }

  async findAll ({ page }: QueryDto): Promise<PaginationResponse<Device>> {
    const { limit = 10, offset = 0 } = page || {}

    const total = await this.deviceModel.find().countDocuments()

    const data = await this.deviceModel
      .find()
      .populate([
        { path: 'region', select: 'name' },
        { path: 'owner', select: 'first_name last_name' },
      ])
      .limit(limit)
      .skip(limit * offset)

    return { data, limit, offset, total }
  }

  async regionAll ({
    filter,
  }: DeviceQueryDto): Promise<PaginationResponse<Device>> {
    const total = await this.deviceModel.find().countDocuments()
    const data = await this.deviceModel.find(filter)
    return { data, limit: 0, offset: 0, total }
  }

  async oneUserDevices (
    req: CustomRequest,
    { page }: QueryDto
  ): Promise<PaginationResponse<Device>> {
    const id = req.user.id
    const { limit = 10, offset = 0 } = page || {}
    const total = await this.deviceModel.find({ owner: id }).countDocuments()
    const data = await this.deviceModel
      .find({ owner: id })
      .populate([
        { path: 'region', select: 'name' },
      ])
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

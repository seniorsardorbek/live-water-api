import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
import { CustomRequest, PaginationResponse } from 'src/_shared/response'
import {
  convertArrayToJSON,
  deleteFile,
  write,
  xlsxToArray,
} from 'src/_shared/utils/passport.utils'
import { Device } from './Schema/Device'
import { CreateDeviceDto } from './dto/create-device.dto'
import { DeviceQueryDto } from './dto/device.query.dto'
import { UpdateDeviceDto } from './dto/update-device.dto'

@Injectable()
export class DevicesService {
  constructor (@InjectModel(Device.name) private deviceModel: Model<Device>) {}

  async create (createDeviceDto: CreateDeviceDto) {
    try {
      const dpkExist = await this.deviceModel.findOne({
        device_privet_key: createDeviceDto.device_privet_key,
      })
      const serieExist = await this.deviceModel.findOne({
        serie: createDeviceDto.serie,
      })
      if (serieExist || dpkExist) {
        throw new BadRequestException({
          msg: `${serieExist ? serieExist.serie : ''} ${
            dpkExist ? dpkExist.serie : ''
          }  already exists!`,
        })
      }
      return this.deviceModel.create(createDeviceDto)
    } catch (error) {
      throw new BadRequestException({
        msg: "Keyinroq urinib ko'ring...",
        error,
      })
    }
  }

  async findAll ({ page }: QueryDto): Promise<PaginationResponse<Device>> {
    try {
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
    } catch (error) {
      throw new BadRequestException({
        msg: "Keyinroq urinib ko'ring...",
        error,
      })
    }
  }

  async regionAll ({
    filter,
  }: DeviceQueryDto): Promise<PaginationResponse<Device>> {
    try {
      const total = await this.deviceModel.find().countDocuments()
      const data = await this.deviceModel.find(filter)
      return { data, limit: 0, offset: 0, total }
    } catch (error) {
      throw new BadRequestException({
        msg: "Keyinroq urinib ko'ring...",
        error,
      })
    }
  }

  async oneUserDevices (
    req: CustomRequest,
    { page }: QueryDto
  ): Promise<PaginationResponse<Device>> {
    try {
      const id = req.user.id
      const { limit = 10, offset = 0 } = page || {}
      const total = await this.deviceModel.find({ owner: id }).countDocuments()
      const data = await this.deviceModel
        .find({ owner: id })
        .populate([{ path: 'region', select: 'name' }])
        .limit(limit)
        .skip(limit * offset)
      return { data, limit, offset, total }
    } catch (error) {
      throw new BadRequestException({
        msg: "Keyinroq urinib ko'ring...",
        error,
      })
    }
  }

  findOne ({ id }: ParamIdDto) {
    try {
      return this.deviceModel.findById(id).populate([
        { path: 'region', select: 'name' },
        { path: 'owner', select: 'username first_name last_name' },
      ])
    } catch (error) {
      throw new BadRequestException({
        msg: "Keyinroq urinib ko'ring...",
        error,
      })
    }
  }

  async update ({ id }: ParamIdDto, updateDeviceDto: UpdateDeviceDto) {
    try {
      const exist = await this.deviceModel.findById(id)
      if (!exist) {
        throw new BadRequestException({ msg: 'Device does not exist!' })
      }
      const dpkExist = await this.deviceModel.findOne({
        device_privet_key: updateDeviceDto.device_privet_key,
        _id: { $ne: id },
      })
      const serieExist = await this.deviceModel.findOne({
        serie: updateDeviceDto.serie,
        _id: { $ne: id },
      })
      if (serieExist && dpkExist) {
        throw new BadRequestException({
          msg: 'Device private key or serie already exists!',
        })
      }

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
    } catch (error) {
      throw new BadRequestException({
        msg: "Keyinroq urinib ko'ring...",
        error,
      })
    }
  }

  async remove ({ id }: ParamIdDto) {
    try {
      const removed = await this.deviceModel.findById(id)
      deleteFile('passports', `${removed.serie}.json`)
      const deleted = await this.deviceModel.findByIdAndDelete(id)
      if (deleted) {
        return { msg: "Qurilma o'chirildi." }
      } else {
        throw new BadRequestException({ msg: 'Qurilmani ochirishda xatolik' })
      }
    } catch (error) {
      throw new BadRequestException({
        msg: "Keyinroq urinib ko'ring...",
        error,
      })
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
import { PaginationResponse } from 'src/_shared/response'
import { Region } from './Schema/Regions'
import { CreateRegionDto } from './dto/create-region.dto'
import { UpdateRegionDto } from './dto/update-region.dto'

@Injectable()
export class RegionsService {
  constructor (@InjectModel(Region.name) private regionModel: Model<Region>) {}
  create (data: CreateRegionDto) {
    try {
      return this.regionModel.create(data)
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }

  async findAll ({ page }: QueryDto): Promise<PaginationResponse<Region>> {
    try {
      const { limit = 10, offset = 0 } = page || {}
      const total = await this.regionModel.find().countDocuments()
      const data = await this.regionModel
        .find()
        .populate([{ path: 'devicesCount' }])
        .select('-id')
        .limit(limit)
        .skip(limit * offset)
      return { data, limit, offset, total }
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }

  async findOne ({ id }: ParamIdDto) {
    try {
      const regionWithDevices = await this.regionModel
        .findById(id)
        .populate('devicesCount')
      return regionWithDevices
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }

  async update ({ id }: ParamIdDto, updateRegionDto: UpdateRegionDto) {
    try {
      const updated = await this.regionModel.findByIdAndUpdate(
        id,
        updateRegionDto,
        { new: true }
      )
      if (!updated) {
        throw new BadRequestException({ msg: 'Foydalanuvchi mavjud emas.' })
      } else {
        return { msg: 'Muvaffaqqiyatli yangilandi.' }
      }
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }

  async remove ({ id }: ParamIdDto) {
    try {
      const removed = await this.regionModel.findByIdAndDelete(id)
      if (!removed) {
        throw new BadRequestException({ msg: 'Hudud mavjud emas.' })
      } else {
        return { msg: "Muvaffaqqiyatli o'chirildi." }
      }
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }
}

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
  constructor(@InjectModel(Region.name) private regionModel: Model<Region>) {}
  create(data: CreateRegionDto) {
    return this.regionModel.create(data)
  }

  async findAll({ page }: QueryDto): Promise<PaginationResponse<Region>> {
    const { limit = 10, offset = 0 } = page || {}
    const total = await this.regionModel.find().countDocuments()

    const data = await this.regionModel
      .find()
      .populate([{ path: 'devicesCount' }])
      .select('-password')
      .limit(limit)
      .skip(limit * offset)

    return { data, limit, offset, total }
  }

  async findOne({ id }: ParamIdDto) {
    const regionWithDevices = await this.regionModel
      .findById(id)
      .populate('devicesCount')
    return regionWithDevices
  }

  async update({ id }: ParamIdDto, updateRegionDto: UpdateRegionDto) {
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
  }

  async remove({ id }: ParamIdDto) {
    const removed = await this.regionModel.findByIdAndDelete(id)
    if (!removed) {
      throw new BadRequestException({ msg: 'Hudud mavjud emas.' })
    } else {
      return { msg: "Muvaffaqqiyatli o'chirildi." }
    }
  }
}

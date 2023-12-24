import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateRegionDto } from './dto/create-region.dto'
import { UpdateRegionDto } from './dto/update-region.dto'
import { Model, ObjectId } from 'mongoose'
import { Region } from './Schema/Regions'
import { InjectModel } from '@nestjs/mongoose'
import { Device } from 'src/devices/Schema/Device'
import { QueryDto } from 'src/_shared/query.dto'
import { PaginationResponse } from 'src/_shared/response'

@Injectable()
export class RegionsService {
  constructor (@InjectModel(Region.name) private regionModel: Model<Region>) {}
  create (data: CreateRegionDto) {
    return this.regionModel.create(data)
  }

  async findAll ({ page }: QueryDto): Promise<PaginationResponse<Region>> {
    const { limit = 10, offset = 0 } = page || {}
    const [result] = await this.regionModel
      .aggregate([
        {
          $facet: {
            data: [{ $skip: limit * offset }, { $limit: limit }],
            total: [
              {
                $count: 'count',
              },
            ],
          },
        },
        {
          $project: {
            data: 1,
            total: { $arrayElemAt: ['$total.count', 0] },
          },
        },
      ])
      .exec()
    const { data, total } = result
    return { data, limit, offset, total }
  }

  async findOne (id: string) {
    const regionWithDevices = await this.regionModel
      .findById(id)
      .populate('devicesCount')
    return regionWithDevices
  }

  async update (id: string, updateRegionDto: UpdateRegionDto) {
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

  async remove (id: string) {
    const removed = await this.regionModel.findByIdAndDelete(id)
    if (!removed) {
      throw new BadRequestException({ msg: 'Hudud mavjud emas.' })
    } else {
      return { msg: "Muvaffaqqiyatli o'chirildi." }
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
import { PaginationResponse } from 'src/_shared/response'
import { Serverdata } from './Schema/Serverdata'
import { UpdateServerdatumDto } from './dto/update-serverdatum.dto'

@Injectable()
export class ServerdataService {
  constructor (
    @InjectModel(Serverdata.name) private serverDataModel: Model<Serverdata>
  ) {}

  async findAll ({ page }: QueryDto): Promise<PaginationResponse<Serverdata>> {
    try {
      const { limit = 10, offset = 0 } = page || {}
      const [result] = await this.serverDataModel
        .aggregate([
          {
            $facet: {
              data: [
                { $sort: { created_at: -1 } },
                { $skip: limit * offset },
                { $limit: limit },
              ],
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
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }

  findOne ({ id }: ParamIdDto) {
    try {
      return this.serverDataModel.findById(id).populate('basedata')
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }

  async update ({ id }: ParamIdDto, updateServerdatumDto: UpdateServerdatumDto) {
    try {
      const updated = await this.serverDataModel.findByIdAndUpdate(
        id,
        updateServerdatumDto,
        { new: true }
      )
      if (!updated) {
        throw new BadRequestException({ msg: 'Server malumoti mavjud emas.' })
      } else {
        return { msg: 'Muvaffaqqiyatli yangilandi.' }
      }
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }

  async remove ({ id }: ParamIdDto) {
    try {
      const removed = await this.serverDataModel.findByIdAndDelete(id)
      if (!removed) {
        throw new BadRequestException({ msg: 'Server malumoti mavjud emas.' })
      } else {
        return { msg: "Muvaffaqqiyatli o'chirildi." }
      }
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }

  
}

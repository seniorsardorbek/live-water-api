import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Serverdata } from './Schema/Serverdata'
import { CreateServerdatumDto } from './dto/create-serverdatum.dto'
import { UpdateServerdatumDto } from './dto/update-serverdatum.dto'
import { QueryDto } from 'src/_shared/query.dto'
import { PaginationResponse } from 'src/_shared/response'

@Injectable()
export class ServerdataService {
  constructor (
    @InjectModel(Serverdata.name)
    private readonly serverdataModel: Model<Serverdata>
  ) {}
  create (createServerdatumDto: CreateServerdatumDto) {
    return this.serverdataModel.create(createServerdatumDto)
  }

  async findAll({ page }: QueryDto): Promise<PaginationResponse<Serverdata>> {
    const { limit = 10, offset = 0 } = page || {};
  
    const [result] = await this.serverdataModel
      .aggregate([
        {
          $facet: {
            data: [
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
      .exec();
  
    const { data, total } = result;
  
    return { data, limit, offset, total };
  }
  
  findOne (id: string) {
    return this.serverdataModel.findById(id).populate('basedata');
  }

 async update (id: string, updateServerdatumDto: UpdateServerdatumDto) {
    const updated = await this.serverdataModel.findByIdAndUpdate(
      id,
      updateServerdatumDto,
      { new: true }
    )
    if (!updated) {
      throw new BadRequestException({ msg: 'Server malumoti mavjud emas.' })
    } else {
      return { msg: 'Muvaffaqqiyatli yangilandi.' }
    }
  }

  async remove (id: string) {
    const removed = await this.serverdataModel.findByIdAndDelete(id)
    if (!removed) {
      throw new BadRequestException({ msg: 'Server malumoti mavjud emas.' })
    } else {
      return { msg: "Muvaffaqqiyatli o'chirildi." }
    }
  }
}

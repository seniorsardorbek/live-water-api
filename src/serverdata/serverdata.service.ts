import { BadRequestException, Injectable, Res } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Serverdata } from './Schema/Serverdata'
import { CreateServerdatumDto } from './dto/create-serverdatum.dto'
import { UpdateServerdatumDto } from './dto/update-serverdatum.dto'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
import { PaginationResponse } from 'src/_shared/response'
import { ServerdataQueryDto } from './dto/serverdata.query.dto'
import { Response } from 'express'
import { formatTimestamp } from 'src/_shared/utils'
import * as XLSX from 'xlsx'

@Injectable()
export class ServerdataService {
  constructor (
    @InjectModel(Serverdata.name)
    private readonly serverdataModel: Model<Serverdata>
  ) {}
  create (createServerdatumDto: CreateServerdatumDto) {
    return this.serverdataModel.create(createServerdatumDto)
  }

  async findAll ({ page }: QueryDto): Promise<PaginationResponse<Serverdata>> {
    const { limit = 10, offset = 0 } = page || {}

    const [result] = await this.serverdataModel
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
    const { data, total =0 } = result

    return { data, limit, offset, total }
  }

  findOne ({ id }: ParamIdDto) {
    return this.serverdataModel.findById(id).populate('basedata')
  }

  async update ({ id }: ParamIdDto, updateServerdatumDto: UpdateServerdatumDto) {
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

  async remove ({ id }: ParamIdDto) {
    const removed = await this.serverdataModel.findByIdAndDelete(id)
    if (!removed) {
      throw new BadRequestException({ msg: 'Server malumoti mavjud emas.' })
    } else {
      return { msg: "Muvaffaqqiyatli o'chirildi." }
    }
  }

  async xlsx ({ filter }: ServerdataQueryDto, @Res() res: Response) {
    const { start, end, device } = filter || {}
    const query: any = {}
    if (start) {
      query.date_in_ms = query.date_in_ms || {}
      query.date_in_ms.$gte = start
    }

    if (end) {
      query.date_in_ms = query.date_in_ms || {}
      query.date_in_ms.$lte = end
    }
    if (device) {
      query.device = device
    }
    const data = await this.serverdataModel.find({ ...query }).exec() 
    const jsonData = data.map((item: any) => {
      const obj = item.toObject()
      obj._id = item._id.toString()
      obj.device = item.device.toString()
      obj.date_in_ms = formatTimestamp(item.date_in_ms)
      return obj
    })
    const ws = XLSX.utils.json_to_sheet(jsonData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'DataSheet')
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' })
    res.setHeader('Content-Disposition', 'attachment; filename=basedata.xlsx')
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.send(excelBuffer)
  }
}

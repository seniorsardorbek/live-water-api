import { Injectable, Res } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Response } from 'express'
import { Model } from 'mongoose'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
import { PaginationResponse } from 'src/_shared/response'
import { formatTimestamp } from 'src/_shared/utils'
import * as XLSX from 'xlsx'
import { Basedata } from './Schema/Basedatas'
import { BasedataQueryDto } from './dto/basedata.query.dto'
import { UpdateBasedatumDto } from './dto/update-basedatum.dto'

@Injectable()
export class BasedataService {
  constructor(
    @InjectModel(Basedata.name) private basedataModel: Model<Basedata>
  ) {}
  async create() {
    return { msg: 'Malumotlar simulation holatda' }
  }

  // ! Barcha ma'lumotlarni olish uchun
  async findAll({
    page,
    filter,
    sort,
  }: BasedataQueryDto): Promise<PaginationResponse<Basedata>> {
    const { limit = 10, offset = 0 } = page || {}
    const { by = 'created_at', order = 'desc' } = sort || {}
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
    const total = await this.basedataModel.find({ ...query }).countDocuments()
    const data = await this.basedataModel
      .find({ ...query })
      .sort({ [by]: order === 'desc' ? -1 : 1 })
      .populate([{ path: 'device', select: 'port serie ip_address ' }])
      .limit(limit)
      .skip(limit * offset)
    return { data, limit, offset, total }
  }

  async lastData({ page }: QueryDto) {
    const { limit = 10, offset = 0 } = page || {}
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000) // Subtract one hour from the current time

    const data = this.basedataModel
      .find({
        createdAt: { $gte: oneHourAgo },
      })
      .limit(limit)
      .skip(limit * offset)
      .exec()
    return data
  }

  //! Bitta qurilma ma'lumotlarini olish uchun
  async findOneDevice(
    { page }: QueryDto,
    { id }: ParamIdDto
  ): Promise<PaginationResponse<Basedata>> {
    const { limit = 10, offset = 0 } = page || {}

    const total = await this.basedataModel.find({ device: id }).countDocuments()
    const data = await this.basedataModel
      .find({ device: id })
      .populate([{ path: 'device', select: 'serie  ' }])
      .limit(limit)
      .skip(limit * offset)
    return { data, limit, offset, total }
  }

  //! Bitta malumotni olish uchun
  findOne({ id }: ParamIdDto) {
    return this.basedataModel.findById(id)
  }

  // ! Bitta mal'lumotni yangilash uchun
  async update({ id }: ParamIdDto, updateBasedatumDto: UpdateBasedatumDto) {
    const updated = await this.basedataModel.findByIdAndUpdate(
      id,
      updateBasedatumDto,
      { new: true }
    )
    if (updated) {
      return { msg: 'Muvaffaqqiyatli yangilandi!' }
    } else {
      return { msg: 'Yangilanishda xatolik!' }
    }
  }

  //! Bitta mal'lumotni o'chirish uchun
  async remove({ id }: ParamIdDto) {
    const removed = await this.basedataModel.findByIdAndDelete(id, {
      new: true,
    })
    if (removed) {
      return { msg: "Muvaffaqqiyatli o'chirildi!" }
    } else {
      return { msg: "O'chirilsihda xatolik!" }
    }
  }

  async xlsx({ filter }: BasedataQueryDto, @Res() res: Response) {
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
    const data = await this.basedataModel.find({ ...query }).exec() // Fetch data from MongoDB
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

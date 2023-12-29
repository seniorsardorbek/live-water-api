import { Injectable, Res } from '@nestjs/common'
import { CreateBasedatumDto } from './dto/create-basedatum.dto'
import { UpdateBasedatumDto } from './dto/update-basedatum.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Basedata } from './Schema/Basedatas'
import { Model } from 'mongoose'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
import { PaginationResponse } from 'src/_shared/response'
import { BasedataQueryDto } from './dto/basedata.query.dto'
import { Device } from 'src/devices/Schema/Device'
import { formatTimestamp, gRN } from 'src/_shared/utils'
import { Cron, CronExpression } from '@nestjs/schedule'
import { ServerdataService } from 'src/serverdata/serverdata.service'
import { Serverdata } from 'src/serverdata/Schema/Serverdata'
import * as XLSX from 'xlsx'
import { Response } from 'express'

@Injectable()
export class BasedataService {
  constructor (
    @InjectModel(Basedata.name) private basedataModel: Model<Basedata>,
    @InjectModel(Device.name) private deviceModel: Model<Device>,
    @InjectModel(Serverdata.name) private serverData: Model<Serverdata>,
    private readonly serverDataService: ServerdataService
  ) {}
  @Cron(CronExpression.EVERY_HOUR)
  async create (createBasedatumDto: CreateBasedatumDto) {
    const devices = await this.deviceModel.find()
    for (let i = 0; i < devices.length; i++) {
      const element = devices[i]
      const date_in_ms = new Date().getTime()
      const { _id } = await this.basedataModel.create({
        level: gRN(5, 59),
        volume: gRN(0.1, 1.2),
        salinity: gRN(1, 10),
        device: element._id,
        signal: 'good',
        date_in_ms,
      })
      this.serverData.create({
        basedata: _id,
        device_privet_key: element.device_privet_key,
        message: 'Yomon.',
        send_data_in_ms: date_in_ms,
        status_code: 200,
      })
    }
    return { msg: 'Malumotlar simulation holatda' }
  }

  // ! Barcha ma'lumotlarni olish uchun
  async findAll ({
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

  async lastData ({ page }: QueryDto) {
    const { limit = 10, offset = 0 } = page || {}
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // Subtract one hour from the current time

    const data = this.basedataModel
    .find({
      createdAt: { $gte: oneHourAgo },
    }).exec();
    return data
  }

  //! Bitta qurilma ma'lumotlarini olish uchun
  async findOneDevice (
    { page }: QueryDto,
    { id }: ParamIdDto
  ): Promise<PaginationResponse<Basedata>> {
    const { limit = 10, offset = 0 } = page || {}

    const total = await this.basedataModel.find({ device: id }).countDocuments()
    const data = await this.basedataModel
      .find({ device: id })
      // .populate([{ path: 'device', select: 'port serie ip_address ' }])
      .limit(limit)
      .skip(limit * offset)
    return { data, limit, offset, total }
  }

  //! Bitta malumotni olish uchun
  findOne ({ id }: ParamIdDto) {
    return this.basedataModel.findById(id)
  }

  // ! Bitta mal'lumotni yangilash uchun
  async update ({ id }: ParamIdDto, updateBasedatumDto: UpdateBasedatumDto) {
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
  async remove ({ id }: ParamIdDto) {
    const removed = await this.basedataModel.findByIdAndDelete(id, {
      new: true,
    })
    if (removed) {
      return { msg: "Muvaffaqqiyatli o'chirildi!" }
    } else {
      return { msg: "O'chirilsihda xatolik!" }
    }
  }

  async xlsx ({ filter }: BasedataQueryDto, @Res() res: Response) {
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

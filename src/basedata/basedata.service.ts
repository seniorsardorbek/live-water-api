import { HttpService } from '@nestjs/axios'
import { BadRequestException, Injectable, Res } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cron, CronExpression } from '@nestjs/schedule'
import { AxiosResponse } from 'axios'
import { Response } from 'express'
import { Model } from 'mongoose'
import { DataItem, sendedDataFace } from 'src/_shared'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
import { CustomRequest, PaginationResponse } from 'src/_shared/response'
import { getDataFromDevice } from 'src/_shared/utils/passport.utils'
import { formatTimestamp, getCurrentDateTime } from 'src/_shared/utils/utils'
import { Device } from 'src/devices/Schema/Device'
import { Serverdata } from 'src/serverdata/Schema/Serverdata'
import * as XLSX from 'xlsx'
import { Basedata } from './Schema/Basedatas'
import { BasedataQueryDto } from './dto/basedata.query.dto'
import { CreateBasedatumDto } from './dto/create-basedatum.dto'

@Injectable()
export class BasedataService {
  constructor (
    private httpService: HttpService,
    @InjectModel(Basedata.name) private basedataModel: Model<Basedata>,
    @InjectModel(Device.name) private deviceModel: Model<Device>,
    @InjectModel(Serverdata.name) private serverDataModel: Model<Serverdata>
  ) {}
  // ?
  async create (createBasedata: CreateBasedatumDto) {
    try {
      const date_in_ms = new Date().getTime()
      const dev = await this.deviceModel
        .findOne({
          serie: createBasedata.serie,
        })
        .lean()
      if (!dev) throw new BadRequestException({ msg: 'Qurilma topilmadi' })
      const baseData = await this.basedataModel.create({
        salinity: createBasedata.salinity,
        level: createBasedata.level,
        temperature: createBasedata.temperature,
        date_in_ms,
        signal: 'good',
        device: dev._id,
      })
      this.fetchData(dev, baseData)
      return baseData
    } catch (error) {
      throw new BadRequestException({
        msg: "Keyinroq urinib ko'ring...",
        error,
      })
    }
  }
  // ?
  // ! Barcha ma'lumotlarni olish uchun
  async findAll ({
    page,
    filter,
    sort,
  }: BasedataQueryDto): Promise<PaginationResponse<Basedata>> {
    try {
      const { limit = 10, offset = 0 } = page || {}
      const { by = 'date_in_ms', order = 'desc' } = sort || {}
      const { start, end, device, region } = filter || {}
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
      if (!device && region) {
        const devices = await this.deviceModel.find({ region }).lean()
        const devices_id = devices.map(device => device._id)
        query.device = { $in: devices_id }
      }
      const total = await this.basedataModel.find({ ...query }).countDocuments()
      const data = await this.basedataModel
        .find({ ...query })
        .sort({ [by]: order === 'desc' ? -1 : 1 })
        .populate([{ path: 'device', select: 'serie name' }])
        .limit(limit)
        .skip(limit * offset)
      return { data, limit, offset, total }
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }
  // ! Barcha ma'lumotlarni olish uchun
  async lastData () {
    try {
      const now = new Date()
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000) // time one hour ago
      const timestampOneHourAgo = oneHourAgo.getTime() // timestamp of one hour ago in milliseconds

      const data: DataItem[] = await this.basedataModel
        .find({ date_in_ms: { $gte: timestampOneHourAgo } })
        .populate('device', 'serie name') // Populate the 'device' field with 'serie' and 'name'
        .lean()
      let uniqueSeriesMap = {}

      data.forEach(item => {
        const serie = item.device.serie
        uniqueSeriesMap[serie] = item
      })

      let uniqueSeriesArray = Object.values(uniqueSeriesMap)
      return uniqueSeriesArray
    } catch (error) {
      throw new BadRequestException({
        msg: "Keyinroq urinib ko'ring...",
        error,
      })
    }
  }

  //! Bitta qurilma ma'lumotlarini olish uchun
  async findOneDevice (
    { page }: QueryDto,
    { id }: ParamIdDto
  ): Promise<PaginationResponse<Basedata>> {
    try {
      const { limit = 10, offset = 0 } = page || {}
      const total = await this.basedataModel
        .find({ device: id })
        .countDocuments()
      const data = await this.basedataModel
        .find({ device: id })
        .populate([{ path: 'device', select: 'serie  name' }])
        .limit(limit)
        .skip(limit * offset)
      return { data, limit, offset, total }
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }

  //! Bitta malumotni olish uchun
  findOne ({ id }: ParamIdDto) {
    try {
      return this.basedataModel.findById(id)
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }

  async xlsx ({ filter, page }: BasedataQueryDto, @Res() res: Response) {
    try {
      const { start, end, device, region } = filter || {}
      const { limit = 1000 } = page || {}
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
      if (!device && region) {
        const devices = await this.deviceModel.find({ region }).lean()
        const devices_id = devices.map(device => device._id)
        query.device = { $in: devices_id }
      }
      const data = await this.basedataModel
        .find({ ...query })
        .sort({ date_in_ms: -1 })
        .populate([{ path: 'device', select: 'serie' }])
        .limit(limit)
        .exec()
      const jsonData = data.map((item: any) => {
        const obj = item.toObject()
        obj._id = item?._id?.toString()
        obj.device = item?.device?.serie
        obj.date_in_ms = formatTimestamp(item?.date_in_ms)
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
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }
  // Operator
  async lastDataOperator (req: CustomRequest) {
    try {
      const now = new Date()
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
      const timestampOneHourAgo = oneHourAgo.getTime()
      const data: DataItem[] = await this.basedataModel
        .find({ date_in_ms: { $gte: timestampOneHourAgo } })
        .populate('device', 'serie name')
        .lean()
      let uniqueSeriesMap = {}

      data.forEach(item => {
        const serie = item.device.serie
        uniqueSeriesMap[serie] = item
      })

      let uniqueSeriesArray = Object.values(uniqueSeriesMap)
      return uniqueSeriesArray
    } catch (error) {
      throw new BadRequestException({
        msg: "Keyinroq urinib ko'ring...",
        error,
      })
    }
  }
  async operatorDeviceBaseData (
    { page, filter, sort }: BasedataQueryDto,
    req: CustomRequest
  ) {
    try {
      const { limit = 10, offset = 0 } = page || {}
      const { by = 'date_in_ms', order = 'desc' } = sort || {}
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
      const owner = req.user.id
      const devices = await this.deviceModel.find({ owner }).lean()
      const devices_id = devices.map(device => device._id)
      const total = await this.basedataModel
        .find({ device: { $in: devices_id }, ...query })
        .countDocuments()
      const data = await this.basedataModel
        .find({
          device: { $in: devices_id },
          ...query,
        })
        .sort({ [by]: order === 'desc' ? -1 : 1 })
        .populate([{ path: 'device', select: 'serie name' }])
        .limit(limit)
        .skip(limit * offset)
        .exec()
      return { data, limit, offset, total }
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }
  async operatorDeviceBaseDataXLSX (
    req: CustomRequest,
    { filter, page }: BasedataQueryDto,
    res: Response
  ) {
    try {
      const { start, end, device, region } = filter || {}
      const { limit = 1000 } = page || {}
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
      if (!device && region) {
        const devices = await this.deviceModel.find({ region }).lean()
        const devices_id = devices.map(device => device._id)
        query.device = { $in: devices_id }
      }
      const owner = req.user.id
      const devices = await this.deviceModel.find({ owner }).lean()
      const devices_id = devices.map(device => device._id)
      const data = await this.basedataModel
        .find({ ...query, device: { $in: devices_id } })
        .sort({ date_in_ms: -1 })
        .populate([{ path: 'device', select: 'serie' }])
        .limit(limit)
        .exec()
      const jsonData = data.map((item: any) => {
        const obj = item.toObject()
        obj._id = item?._id?.toString()
        obj.device = item?.device?.serie
        obj.date_in_ms = formatTimestamp(item?.date_in_ms)
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
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }
  @Cron(CronExpression.EVERY_HOUR)
  async createAuto () {
    try {
      const devices = await this.deviceModel.find()
      const date_in_ms = new Date().getTime()
      devices.map(async (dev: any) => {
        const { level, salinity, temperature } = await getDataFromDevice(
          dev.serie
        )
        const baseData = await this.basedataModel.create({
          salinity,
          level,
          temperature,
          date_in_ms,
          signal: 'good',
          device: dev._id,
        })
        this.fetchData(dev, baseData)
      })
    } catch (error) {
      console.log(error)
    }
  }
  fetchData (dev: Device, basedata: any) {
    const { level, salinity, temperature, date_in_ms } = basedata
    const url = 'http://89.236.195.198:3010'
    const data: sendedDataFace = {
      code: dev.device_privet_key,
      data: {
        level,
        meneral: salinity,
        temperatyra: temperature,
        vaqt: getCurrentDateTime(date_in_ms),
      },
    }
    this.httpService
      .post(url, data, { headers: { 'Content-Type': 'application/json' } })
      .toPromise()
      .then(res => {
        this.saveData(basedata, data, res)
      })
      .catch(err => {
        this.saveData(basedata, data, err)
      })
  }

  async saveData (basedata: any, data, res: AxiosResponse) {
    try {
      this.serverDataModel.create({
        basedata: basedata?._id,
        message:
          res.data?.code === 23000
            ? 'Saqlandi.'
            : res.data?.message || 'Saqlandi',
        device_privet_key: data.code,
        send_data_in_ms: basedata.date_in_ms,
        status_code: res.status || 200,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

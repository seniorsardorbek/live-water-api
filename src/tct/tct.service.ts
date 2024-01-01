import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cron, CronExpression } from '@nestjs/schedule'
import { AxiosResponse } from 'axios'
import { Model } from 'mongoose'
import { generateRandomNumber, getCurrentDateTime } from 'src/_shared/utils'
import { Basedata } from 'src/basedata/Schema/Basedatas'
import { Device } from 'src/devices/Schema/Device'
import { Serverdata } from 'src/serverdata/Schema/Serverdata'

@Injectable()
export class TctService {
  constructor(
    private httpService: HttpService,
    @InjectModel(Device.name) private deviceModel: Model<Device>,
    @InjectModel(Basedata.name) private basedataModel: Model<Basedata>,
    @InjectModel(Serverdata.name) private serverDataModel: Model<Serverdata>
  ) {}
  @Cron(CronExpression.EVERY_HOUR)
  async create() {
    const devices = await this.deviceModel.find()
    const date_in_ms = new Date().getTime()
    devices.map((dev) => {
      const { level, volume, salinity } = generateRandomNumber(5, 59)
      this.fetchData(dev, level, volume, salinity, date_in_ms)
    })
  }

  fetchData(
    dev: Device,
    level: number,
    volume: number,
    salinity: number,
    date_in_ms: number
  ) {
    const url = 'http://89.236.195.198:2010'
    const data = {
      code: dev.device_privet_key,
      data: {
        level,
        volume,
        salinity,
        vaqt: getCurrentDateTime(date_in_ms),
      },
    }
    this.httpService
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .toPromise()
      .then((res) => {
        this.saveData(data, dev, res, date_in_ms)
      })
  }

  async saveData(
    data: any,
    device: any,
    res: AxiosResponse,
    date_in_ms: number
  ) {
    const { level, salinity, volume } = data.data
    const { _id } = await this.basedataModel.create({
      date_in_ms,
      device: device._id,
      level,
      salinity,
      volume,
      signal: 'good',
    })
    this.serverDataModel.create({
      basedata: _id,
      message: res.data.message,
      device_privet_key: data.code,
      send_data_in_ms: date_in_ms,
      status_code:  res.data.status === 'success' 
        ? 200
        : res.data.status === 'error'
        ? 404
        : '500'
    })
  }
}

import { HttpService } from '@nestjs/axios'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cron, CronExpression } from '@nestjs/schedule'
import { AxiosResponse } from 'axios'
import { Model } from 'mongoose'
import { sendedDataFace } from 'src/_shared'
import { ParamIdDto, QueryDto } from 'src/_shared/query.dto'
import { PaginationResponse } from 'src/_shared/response'
import { getCurrentDateTime } from 'src/_shared/utils/utils'
import { Basedata } from 'src/basedata/Schema/Basedatas'
import { Device } from 'src/devices/Schema/Device'
import { Serverdata } from './Schema/Serverdata'
import { UpdateServerdatumDto } from './dto/update-serverdatum.dto'
import { getDataFromDevice } from 'src/_shared/utils/passport.utils'

@Injectable()
export class ServerdataService {
  constructor (
    private httpService: HttpService,
    @InjectModel(Device.name) private deviceModel: Model<Device>,
    @InjectModel(Basedata.name) private basedataModel: Model<Basedata>,
    @InjectModel(Serverdata.name) private serverDataModel: Model<Serverdata>
  ) {}
  @Cron(CronExpression.EVERY_HOUR)
  async create () {
    try {
      const devices = await this.deviceModel.find()
      const date_in_ms = new Date().getTime()
      devices.map(async (dev: any) => {
        const { level, salinity, temperature } = await getDataFromDevice(dev.serie)
        const baseData = await this.basedataModel.create({
          salinity,
          level,
          temperature,
          date_in_ms,
          signal: 'good',
          device: dev._id,
        }).catch((error)=>{
          console.log(error);
        })
        console.log(baseData);
        this.fetchData(dev, baseData)
      })
    } catch (error) {
      console.log(error);
    }
  }

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
        this.saveData(basedata, data , res)
      })
      .catch(err => {
        this.saveData(basedata,data , err)
      })
  }

  async saveData (basedata: any, data , res: AxiosResponse) {
    this.serverDataModel.create({
      basedata: basedata?._id,
      message:res.data?.message || 'Malumotlarni serverga yuborishda server tomondan xatolik',
      device_privet_key: data.code,
      send_data_in_ms: basedata.date_in_ms,
      status_code: res?.data?.status==='success'? 200:res.data?.status==='error'?404:500,
    })
  }
}

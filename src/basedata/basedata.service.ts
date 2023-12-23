import { Injectable } from '@nestjs/common';
import { CreateBasedatumDto } from './dto/create-basedatum.dto';
import { UpdateBasedatumDto } from './dto/update-basedatum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Basedata } from './Schema/Basedatas';
import { Model } from 'mongoose';
import { QueryDto } from 'src/_shared/query.dto';
import { PaginationResponse } from 'src/_shared/response';
import { BasedataQueryDto } from './dto/basedata.query.dto';

@Injectable()
export class BasedataService {
  constructor(@InjectModel(Basedata.name) private basedataModel: Model<Basedata>) { }
  create(createBasedatumDto: CreateBasedatumDto) {
    return this.basedataModel.create(createBasedatumDto);
  }
  
// ! Barcha ma'lumotlarni olish uchun
  async findAll({ page, filter, sort }: BasedataQueryDto): Promise<PaginationResponse<Basedata>> {
    const { limit = 10, offset = 0 } = page || {};
    const { by, order = 'desc' } = sort || {};
    const total = await this.basedataModel.find({ ...filter }).countDocuments();

    const data = await this.basedataModel
      .find({ ...filter })
      .sort({ [by]: order === 'desc' ? -1 : 1 })
      // .populate([{ path: 'device', select: 'port serie ip_address ' }])
      .limit(limit)
      .skip(limit * offset);
    return { data, limit, offset, total };
  }

//! Bitta qurilma ma'lumotlarini olish uchun
  async findOneDevice({ page }: QueryDto, id: string): Promise<PaginationResponse<Basedata>> {
    const { limit = 10, offset = 0 } = page || {};

    const total = await this.basedataModel.find({device : id}).countDocuments();
    const data = await this.basedataModel
      .find({device : id})
      // .populate([{ path: 'device', select: 'port serie ip_address ' }])
      .limit(limit)
      .skip(limit * offset);
    return { data, limit, offset, total };
  }

//! Bitta malumotni olish uchun
  findOne(id: string) {
    return this.basedataModel.findById(id);
  }

// ! Bitta mal'lumotni yangilash uchun
  update(id: string, updateBasedatumDto: UpdateBasedatumDto) {
    const updated = this.basedataModel.findByIdAndUpdate(id, updateBasedatumDto, { new: true });
    if (updated) {
      return { msg: 'Muvaffaqqiyatli yangilandi!' };
    } else {
      return { msg: 'Yangilanishda xatolik!' };
    }
  }

//! Bitta mal'lumotni o'chirish uchun
  remove(id: string) {
    const removed = this.basedataModel.findByIdAndDelete(id, { new: true });
    if (removed) {
      return { msg: "Muvaffaqqiyatli o'chirildi!" };
    } else {
      return { msg: "O'chirilsihda xatolik!" };
    }
  }
}

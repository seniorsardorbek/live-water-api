import { Injectable } from '@nestjs/common';
import { CreateBasedatumDto } from './dto/create-basedatum.dto';
import { UpdateBasedatumDto } from './dto/update-basedatum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Basedata } from './Schema/Basedatas';
import { Model } from 'mongoose';

@Injectable()
export class BasedataService {
  constructor(@InjectModel(Basedata.name) private  basedataModel : Model<Basedata>) {
    
  }
  create(createBasedatumDto: CreateBasedatumDto) {
    return this.basedataModel.create(createBasedatumDto) ;
  }

  findAll() {
    return this.basedataModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} basedatum`;
  }

  update(id: number, updateBasedatumDto: UpdateBasedatumDto) {
    return `This action updates a #${id} basedatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} basedatum`;
  }
}

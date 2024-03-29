import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { ObjectId } from 'mongoose'
import { Status } from 'src/_shared/enums'

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: false,
    updatedAt: false,
  },
})
export class Basedata {
  @Prop({
    type: Number,
    required: true,
  })
  level: number
  @Prop({
    type: Number,
    required: true,
  })
  salinity: number
  @Prop({
    type: Number,
    required: true,
  })
  temperature: number
  @Prop({
    type: Number,
    required: true,
  })
  date_in_ms: number
  @Prop({
    type: String,
    enum: Status,
    required: true,
  })
  signal: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Device',
  })
  device: ObjectId
}
export const BasedataSchema = SchemaFactory.createForClass(Basedata)

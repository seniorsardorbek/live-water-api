import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { ObjectId } from 'mongoose'
import { UserRole } from 'src/_shared/enums'

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  first_name: string
  @Prop({
    type: String,
    required: true,
  })
  last_name: string
  @Prop({
    type: String,
    required: true,
  })
  username: string
  @Prop({
    type: String,
    required: true,
  })
  password: string
  @Prop({
    type: String,
    enum: UserRole,
    required: true,
  })
  role: string
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Region',
  })
  region: ObjectId
}
export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.virtual('devices', {
  ref: 'Device',
  localField: '_id',
  foreignField: 'owner',
  justOne: false,
})

// UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true })

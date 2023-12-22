import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})
export class Region {
    @Prop({
        type: String,
        required: true
    })
    name: string;

}
export const RegionSchema = SchemaFactory.createForClass(Region);

RegionSchema.virtual('devicesCount', {
    ref: 'Device',
    localField: '_id',
    foreignField: 'region',
    justOne: false,
    count : true
  });

// RegionSchema.set('toObject', { virtuals: true });
RegionSchema.set('toJSON', { virtuals: true });
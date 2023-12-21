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
    name: String;
}
export const RegionSchema = SchemaFactory.createForClass(Region);

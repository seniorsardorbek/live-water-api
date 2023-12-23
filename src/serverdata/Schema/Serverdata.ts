import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';

@Schema({
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})
export class Serverdata {
    @Prop({
        type: String,
        required: true,
        unique: true
    })
    device_privet_key: string;

    @Prop({
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Basedata'
    })
    basedata: ObjectId;

    @Prop({
        type: String,
        required: true,
    })
    send_data_in_ms: string;

    @Prop({
        type: Number,
        required: true,
    })
    status_code: number;

    @Prop({
        type: String,
        required: true,
    })
    message: string;


}
export const ServerdataSchema = SchemaFactory.createForClass(Serverdata);



// ServerdataSchema.set('toObject', { virtuals: true });
ServerdataSchema.set('toJSON', { virtuals: true });
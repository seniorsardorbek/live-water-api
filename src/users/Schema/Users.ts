import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { UserRole } from 'src/shared/enums';

@Schema({
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})
export class User {
    @Prop({
        type: String,
        required: true
    })
    first_name: String;
    @Prop({
        type: String,
        required: true
    })
    last_name: String;
    @Prop({
        type: String,
        required: true
    })
    username: String;
    @Prop({
        type: String,
        required: true
    })
    password: String;
    @Prop({
        type: String,
        enum: UserRole,
        required: true
    })
    role: string;
    @Prop({
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Region', 
    })
    region: ObjectId;
}
export const UserSchema = SchemaFactory.createForClass(User);

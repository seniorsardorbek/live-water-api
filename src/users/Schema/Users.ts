import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})
export class User {
    @Prop({ type: String, required: true })
    first_name: String
    @Prop({ type: String, required: true })
    last_name: String
    @Prop({ type: String, required: true })
    username: String
    @Prop({ type: String, required: true })
    password: String
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    region: string
} 
export const UserSchema = SchemaFactory.createForClass(User);

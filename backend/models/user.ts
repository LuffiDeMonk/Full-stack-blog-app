import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    role: { type: Number, default: 0 }
}
)

export const User = mongoose.models?.User || mongoose.model('User', UserSchema)
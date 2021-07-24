import mongoose, { Schema } from 'mongoose';
import IRoles from '../interfaces/IRoles';

const RolesSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        status: { type: Number, required: true },
    },
);

export default mongoose.model<IRoles>('roles', RolesSchema);
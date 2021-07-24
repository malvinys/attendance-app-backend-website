import mongoose, { Schema } from 'mongoose';
import IRoles from '../interfaces/IRoles';

const RolesSchema: Schema = new Schema(
    {
        name: { type: String },
        status: { type: Number },
    },
);

export default mongoose.model<IRoles>('roles', RolesSchema);
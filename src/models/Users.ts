import mongoose, { Schema } from 'mongoose';
import IUsers from '../interfaces/IUsers';

const UsersSchema: Schema = new Schema(
    {
        email: { type: String },
        password: { type: String },
        name: { type: String },
        rolesId: { type: String },
        rolesName: { type: String },
        status: { type: Number },
        createdBy: { type: String },
        createdAt: { type: Date },
        updatedBy: { type: String },
        updatedAt: { type: Date },
        deletedBy: { type: String },
        deletedAt: { type: Date },
    },
);

export default mongoose.model<IUsers>('users', UsersSchema);
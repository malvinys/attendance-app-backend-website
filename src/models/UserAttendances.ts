import mongoose, { Schema } from 'mongoose';
import IUserAttendances from '../interfaces/IUserAttendances';

const UserAttendanceSchema: Schema = new Schema(
    {
        userId: { type: String },
        lookupActivitiesId: { type: String },
        lookupActivitiesName: { type: String },
        pathPhoto: { type: String },
        latitude: { type: String },
        longitude: { type: String },
        status: { type: Number },
        createdBy: { type: String },
        createdAt: { type: Date },
    },
);

export default mongoose.model<IUserAttendances>('userattendances', UserAttendanceSchema);
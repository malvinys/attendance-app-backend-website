import mongoose, { Schema } from 'mongoose';
import IUserAttendances from '../interfaces/IUserAttendances';

const UserAttendanceSchema: Schema = new Schema(
    {
        userId: { type: String, required: true },
        lookupActivitiesId: { type: String, required: true },
        lookupActivitiesName: { type: String, required: true },
        pathPhoto: { type: String, required: true },
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
        status: { type: Number, required: true },
        createdBy: { type: String, required: true },
        createdAt: { type: Date, required: true },
    },
);

export default mongoose.model<IUserAttendances>('userattendances', UserAttendanceSchema);
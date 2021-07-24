import mongoose, { Schema } from 'mongoose';
import ILookupActivities from '../interfaces/ILookupActivities';

const LookupActivitiesSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        status: { type: Number, required: true },
    },
);

export default mongoose.model<ILookupActivities>('lookupactivities', LookupActivitiesSchema);
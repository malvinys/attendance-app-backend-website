import mongoose, { Schema } from 'mongoose';
import ILookupActivities from '../interfaces/ILookupActivities';

const LookupActivitiesSchema: Schema = new Schema(
    {
        name: { type: String },
        status: { type: Number },
    },
);

export default mongoose.model<ILookupActivities>('lookupactivities', LookupActivitiesSchema);
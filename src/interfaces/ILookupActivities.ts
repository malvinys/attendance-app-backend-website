import { Document } from 'mongoose';

interface ILookupActivities extends Document {
    name: string;
    status: number;
}

export default ILookupActivities;
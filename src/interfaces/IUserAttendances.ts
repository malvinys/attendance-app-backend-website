import { Document } from 'mongoose';

interface IUserAttendances extends Document {
    userId: string;
    lookupActivitiesId: string;
    lookupActivitiesName: string;
    pathPhoto: string;
    latitude: string;
    longitude: string;
    status: number;
    createdBy: string;
    createdAt: string;
}

export default IUserAttendances;
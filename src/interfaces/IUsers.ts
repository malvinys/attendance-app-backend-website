import { Document } from 'mongoose';

interface IUsers extends Document {
    email?: string;
    password?: string;
    name?: string;
    rolesId?: string;
    rolesName?: string;
    status?: number;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
    deletedBy?: string;
    deletedAt?: Date;
}

export default IUsers;
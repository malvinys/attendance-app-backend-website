import { Document } from 'mongoose';

interface IRoles extends Document {
    name: string;
    status: number;
}

export default IRoles;
import { NextFunction, Request, Response } from 'express';

import {ResponseApi, ResponseServerErrorApi} from '../utils/ResponseApi';
import LookupActivities from '../models/LookupActivities';

const activities = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lookupActivities = await LookupActivities.find().exec();

        return ResponseApi({
            res, code:'success',
            codeType:'1',
            message:'get lookup activity successfully',
            data: lookupActivities
        });
    } catch (error) {
        console.log('error', error)
        return ResponseServerErrorApi({res, data: {error}});
    }
};


export default {
    activities
};
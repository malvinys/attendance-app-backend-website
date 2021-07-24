import { NextFunction, Request, Response } from 'express';

import {ResponseApi, ResponseServerErrorApi} from '../utils/ResponseApi';
import UserAttendances from '../models/UserAttendances';

const getActivities = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userAttendances = await UserAttendances.find().sort({ '_id': 'desc' }).exec();

        return ResponseApi({
            res, code:'success',
            codeType:'1',
            message:'get activities successfully',
            data: userAttendances
        });
    } catch (error) {
        console.log('error', error)
        return ResponseServerErrorApi({res, data: {error}});
    }
};

const getActivityDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        /** validate request */
        if(!userId) {
            return ResponseApi({res, code:'error', codeType:'0', message:'UserId is required'});
        }

        const userAttendances = await UserAttendances.find({ userId }).sort({ '_id': 'desc' }).exec();

        return ResponseApi({
            res, code:'success',
            codeType:'1',
            message:'get activity detail successfully',
            data: userAttendances
        });
    } catch (error) {
        console.log('error', error)
        return ResponseServerErrorApi({res, data: {error}});
    }
};

export default {
    getActivities,
    getActivityDetail
};
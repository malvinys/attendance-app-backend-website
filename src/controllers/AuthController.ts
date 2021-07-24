import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { ResponseApi, ResponseServerErrorApi } from '../utils/ResponseApi';
import { ROLE_SUPER_ADMIN_ID } from '../config/constants';

import Users from '../models/Users';

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        /** validate request */
        if(!email) {
            return ResponseApi({res, code:'error', codeType:'0', message:'Email is required'});
        }
        if(!password) {
            return ResponseApi({res, code:'error', codeType:'0', message:'Password is required'});
        }

        const user = await Users.findOne({ email }).exec();
        if(! user) {
            return ResponseApi({res, code:'error', codeType:'0', message:'Email not exist'});
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(! isValidPassword) {
            return ResponseApi({res, code:'error', codeType:'0', message:'Authentication failed'});
        }

        if(user.rolesId !== ROLE_SUPER_ADMIN_ID) {
            return ResponseApi({res, code:'error', codeType:'0', message:'Invalid access'});
        }

        if(user.status === 0) {
            return ResponseApi({res, code:'error', codeType:'0', message:'User not active'});
        }

        return ResponseApi({
            res, code:'success',
            codeType:'1',
            message:'Login successfully',
            data: {
                '_id': user.id,
                email: user.email,
                name: user.name,
                rolesId: user.rolesId,
                rolesName: user.rolesName,
                status: user.status
            }
        });
    } catch (error) {
        console.log('error', error)
        return ResponseServerErrorApi({res, data: {error}});
    }
};


export default {
    login
};
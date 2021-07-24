import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import {ResponseApi, ResponseServerErrorApi} from '../utils/ResponseApi';
import { ROLE_GENERAL_USER_ID } from '../config/constants';

import Users from '../models/Users';
import Roles from '../models/Roles';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await Users.find().select(['_id', 'email', 'name', 'rolesName', 'status']).sort({'email': 'asc'}).exec();

        return ResponseApi({
            res,
            code:'success',
            codeType:'1',
            message:'get users successfully',
            data: users
        });
    } catch (error) {
        console.log('error', error)
        return ResponseServerErrorApi({res, data: {error}});
    }
};

const getUserDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        const user = await Users.findById(userId).select(['_id', 'email', 'name', 'rolesName', 'status']).sort({'email': 'asc'}).exec();

        return ResponseApi({
            res,
            code:'success',
            codeType:'1',
            message:'get user detail successfully',
            data: user
        });
    } catch (error) {
        console.log('error', error)
        return ResponseServerErrorApi({res, data: {error}});
    }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { uuid } = req.headers;
        const { email, password, name } = req.body;

        /** validate request */
        if(!uuid) {
            return ResponseApi({res, code:'error', codeType:'0', message:'Header uuid is required'});
        } else {
            const userUuid = await Users.findById(uuid).exec();
            if(! userUuid) {
                return ResponseApi({res, code:'error', codeType:'0', message:'Invalid uuid'});
            }
        }

        if(!email) {
            return ResponseApi({res, code:'error', codeType:'0', message:'Email is required'});
        } else {
            const checkExistEmail = await Users.findOne({ email }).exec();
            if(checkExistEmail) {
                return ResponseApi({res, code:'error', codeType:'0', message:'Email already exist'});
            }
        }

        if(!password) {
            return ResponseApi({res, code:'error', codeType:'0', message:'Password is required'});
        }

        if(!name) {
            return ResponseApi({res, code:'error', codeType:'0', message:'Name is required'});
        }

        const salt = await bcrypt.genSalt(10);
        const userPassword = await bcrypt.hash(password, salt);

        const role = await Roles.findById(ROLE_GENERAL_USER_ID).exec();
        const rolesName = role ? role.name : 'General User';

        const newUser = new Users({
            email,
            password: userPassword,
            name,
            rolesId: ROLE_GENERAL_USER_ID,
            rolesName,
            status: 1,
            createdBy: uuid,
            createdAt: new Date,
        });
        newUser.save();

        return ResponseApi({
            res,
            code:'success',
            codeType:'1',
            message:'create user successfully',
            data: null
        });
    } catch (error) {
        console.log('error', error)
        return ResponseServerErrorApi({res, data: {error}});
    }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { uuid } = req.headers;
        const { userId } = req.params;
        const { email, password, name } = req.body;

        /** validate request */
        if(!uuid) {
            return ResponseApi({res, code:'error', codeType:'0', message:'Header uuid is required'});
        } else {
            const userUuid = await Users.findById(uuid).exec();
            if(! userUuid) {
                return ResponseApi({res, code:'error', codeType:'0', message:'Invalid uuid'});
            }
        }

        const newData: {email?: string, password?: string, name?: string, updatedBy?: any, updatedAt?: Date} = {
            updatedBy: uuid,
            updatedAt: new Date
        };

        if(email) {
            newData.email = email;
        }

        if(password) {
            const salt = await bcrypt.genSalt(10);
            newData.password = await bcrypt.hash(password, salt);
        }

        if(name) {
            newData.name = name;
        }

        const updateUser = await Users.updateOne({'_id': userId}, newData);
        if(! updateUser) {
            return ResponseApi({res, code:'error', codeType:'0', message:'Update failed', data: null});
        }

        return ResponseApi({
            res,
            code:'success',
            codeType:'1',
            message:'Update successfully',
            data: null
        });
    } catch (error) {
        console.log('error', error)
        return ResponseServerErrorApi({res, data: {error}});
    }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { uuid } = req.headers;
        const { userId } = req.params;

        /** validate request */
        if(!uuid) {
            return ResponseApi({res, code:'error', codeType:'0', message:'Header uuid is required'});
        } else {
            const userUuid = await Users.findById(uuid).exec();
            if(! userUuid) {
                return ResponseApi({res, code:'error', codeType:'0', message:'Invalid uuid'});
            }
        }

        const newData: {status?: number, deletedBy?: any, deletedAt?: Date} = {
            status: 0,
            deletedBy: uuid,
            deletedAt: new Date
        };

        const deleteUser = await Users.updateOne({'_id': userId}, newData);
        if(! deleteUser) {
            return ResponseApi({res, code:'error', codeType:'0', message:'Delete failed', data: null});
        }

        return ResponseApi({
            res,
            code:'success',
            codeType:'1',
            message:'Delete successfully',
            data: null
        });
    } catch (error) {
        console.log('error', error)
        return ResponseServerErrorApi({res, data: {error}});
    }
};

export default {
    getUsers,
    getUserDetail,
    createUser,
    updateUser,
    deleteUser
};
import { RequestHandler } from "express";
import UserModel from '../models/User.model';
import createHttpError from 'http-errors';

export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await UserModel.find().exec();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const getUser: RequestHandler = async (req, res, next) => {
    const userID = req.params.userID;
    try {
        const user = await UserModel.findById(userID).exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

interface CreateUserBody {
    name: string,
    email: string,
    passwordHash: string,
}

export const createUser: RequestHandler<unknown, unknown, CreateUserBody, unknown> = async (req, res, next) => {
    const { name, email, passwordHash } = req.body;
    try {
        if(!name || !email || !passwordHash ) {
            throw createHttpError(400, "Must have name, email, and password!");
        }
        const newUser = await UserModel.create({
            name: name,
            email: email,
            passwordHash: passwordHash,
        });
        res.status(201).json(newUser);
    } catch (error) {
        next(error)
    }
}
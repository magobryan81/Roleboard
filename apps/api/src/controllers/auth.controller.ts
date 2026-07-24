import { RequestHandler } from "express";
import UserModel from '../models/User.model';
import createHttpError from 'http-errors';
import mongoose from "mongoose";

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
        if (!mongoose.isValidObjectId(userID)) {
            throw createHttpError(400, "Invalid user ID!");
        }

        const user = await UserModel.findById(userID).exec();

        if (!user) {
            throw createHttpError(404, "User not found!");
        }

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

interface UpdateUserParams {
    userID: string,
}


interface UpdateUserBody {
    name?: string,
    email?: string,
}

export const updateUser: RequestHandler<UpdateUserParams, unknown, UpdateUserBody, unknown> = async(req, res, next) => {
    const userID = req.params.userID;
    const newName = req.body.name;
    const newEmail = req.body.email;

    try {
        if (!mongoose.isValidObjectId(userID)) {
            throw createHttpError(400, "Invalid user ID!");
        }

        if (!newName) {
            throw createHttpError(404, "Must have a name!");
        }

        const user = await UserModel.findById(userID).exec();

        if (!user) {
            throw createHttpError(404, "User not found!");
        }

        user.name = newName;
        if (newEmail !== undefined) {
            user.email = newEmail;
        }

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}
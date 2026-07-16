import { Request, Response } from 'express';
// import User from '../models/User.model';
// import { signToken, sendTokenCookie } from '../utils/jwt';
// import asyncHandler from '../utils/asyncHandler';

export const register = asyncHandler(async (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body;

        // validate user required fields
        if(!name || !email || !password) {
            res.status(400).json({
                success: false,
                messsage: 'Please provide name, email, and password',
            });
            return;
        }

        // check if the user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: 'Email already in use',
            });
            return;
        }

        // create the user passwordHash field triggers bcrypt hashing in User.model.ts
        const user = await User.create({name, email, passwordHash: password});

        // sign JWT and attach it to response as an httpOnly cookie
        const token = signToken(user._id.toString());
        sendToCookies(res, token);

        // respond with the new user, never send back passwordHash
        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error: unknown) {
        // handle mongoose validation errors (e.g. missing required fields)
        if ((error as {name?: string}).name === 'ValidationError') {
            res.status(400).json({
                success: false,
                message: (error as Error).message,
            });
            return;
        }

        // all other errors - pass to Express error middleware (error.middleware.ts)
        throw error;
    }
})

export const login = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // validate required fields
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            });
            return;
        }

        // find user - we need passwordHash for comparison so we select it explicitly
        // (passwordHash is excluded by default via select: false in the model)
        const user = await User.findOne({email}).select('+passwordHash');
        if (!user) {
            // vague error on purpose - don't reveal whether the email exists
            res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
            return;
        }

        // compare submitted password with stored hash using bcrypt
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
            return;
        }

        // sign JWT and attach it to response as an httpOnly cookie
        // sign JWT and attach it to response as an httpOnly cookie
        const token = signToken(user._id.toString());
        sendToCookies(res, token);

        // respond with the new user, never send back passwordHash
        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    
    } catch (error: unknown) {
        //handle invalid MongoDB ObjectID format
        if((error as { name?: string }).name === 'CastError') {
            res.status(400).json({
                success: false,
                message: 'Invalid data format',
            });
            return;
        }

        // all other errors - pass to Express error middleware (error.middleware.ts)
        throw error;
    }
})

export const logout = asyncHandler(async (_req: Request, res: Response) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Data(0), // immediately expire the cookie
        });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    
    } catch (error: unknown) {
        //handle invalid MongoDB ObjectID format
        if((error as { name?: string }).name === 'CastError') {
            res.status(400).json({
                success: false,
                message: 'Invalid data format',
            });
            return;
        }

        // logout rarely fails but we handle it gracefully anyway
        throw error;
    }
})

export const getMe = asyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.user;

        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Not authorized',
            });
            return;
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    
    } catch (error: unknown) {
        // pass unexpected errors to Express error middleware
        throw error;
    }
})

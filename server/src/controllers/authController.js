import { catchAsync } from '../utils/catchAsync.js';
import * as authService from '../services/authService.js';

export const register = catchAsync(async (req, res, next) => {
    const { user, token } = await authService.registerUser(req.body);

    res.status(201).json({
        success: true,
        token,
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        },
    });
});

export const login = catchAsync(async (req, res, next) => {
    const { user, token } = await authService.loginUser(req.body);

    res.status(200).json({
        success: true,
        token,
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        },
    });
});

export const getMe = catchAsync(async (req, res, next) => {
    const user = await authService.getUserById(req.user.id);
    
    res.status(200).json({
        success: true,
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        }
    });
});
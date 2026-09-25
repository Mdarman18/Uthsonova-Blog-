import { body } from 'express-validator';

export const blogValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required'),
    
    body('content')
        .notEmpty()
        .withMessage('Content is required'),
    
    body('conclusion')
        .notEmpty()
        .withMessage('Conclusion is required'),
];

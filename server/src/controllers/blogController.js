import Blog from '../models/blog.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';

export const createBlog = catchAsync(async (req, res, next) => {
    // author is set from the authenticated user
    const blogData = { ...req.body, author: req.user.id };
    const blog = await Blog.create(blogData);

    res.status(201).json({
        success: true,
        message: 'Blog created successfully',
        data: { blog },
    });
});

export const getAllBlogs = catchAsync(async (req, res, next) => {
    // Only return published blogs by default, or all if specified (can add query filters)
    const filter = req.query.status ? { status: req.query.status } : { status: 'Published' };
    const blogs = await Blog.find(filter).populate('author', 'name email');

    res.status(200).json({
        success: true,
        results: blogs.length,
        data: { blogs },
    });
});

export const getBlogById = catchAsync(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');

    if (!blog) {
        return next(new AppError('Blog not found', 404));
    }

    res.status(200).json({
        success: true,
        data: { blog },
    });
});

export const updateBlog = catchAsync(async (req, res, next) => {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new AppError('Blog not found', 404));
    }

    // Ensure the user is the author
    if (blog.author.toString() !== req.user.id) {
        return next(new AppError('You are not authorized to update this blog', 403));
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        message: 'Blog updated successfully',
        data: { blog },
    });
});

export const deleteBlog = catchAsync(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new AppError('Blog not found', 404));
    }

    // Ensure the user is the author
    if (blog.author.toString() !== req.user.id) {
        return next(new AppError('You are not authorized to delete this blog', 403));
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Blog deleted successfully',
        data: null,
    });
});

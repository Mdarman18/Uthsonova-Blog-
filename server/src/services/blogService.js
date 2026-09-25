
import Blog from '../models/blog.js';

export const createBlog = async (blogData) => {
    return await Blog.create(blogData);
};

export const getAllBlogs = async (filter) => {
    return await Blog.find(filter).populate('author', 'name email');
};

export const getBlogById = async (id) => {
    return await Blog.findById(id).populate('author', 'name email');
};

export const updateBlog = async (id, updateData) => {
    return await Blog.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
};

export const deleteBlog = async (id) => {
    return await Blog.findByIdAndDelete(id);
};

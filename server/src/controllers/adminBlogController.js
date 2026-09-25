import Blog from '../models/blog.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin endpoints for managing blogs
 */

/**
 * @swagger
 * /api/admin/blogs/{id}/status:
 *   patch:
 *     summary: Toggle a blog's status between Draft and Published
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: Blog status updated
 *       404:
 *         description: Blog not found
 */
export const toggleBlogStatus = catchAsync(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return next(new AppError('Blog not found', 404));
    }

    // Toggle between 'Draft' and 'Published'
    blog.status = blog.status === 'Draft' ? 'Published' : 'Draft';
    await blog.save();

    res.status(200).json({
        success: true,
        message: `Blog status updated to ${blog.status}`,
        data: {
            blog,
        },
    });
});

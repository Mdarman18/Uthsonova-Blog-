import { env } from '../config/env.js';
import jwt from 'jsonwebtoken';

export function protect(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authorised' });
  }

  try {
    const token = authHeader.split(' ')[1];
    req.user = jwt.verify(token, env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
}

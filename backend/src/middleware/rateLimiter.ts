import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

// Base rate limiter configuration
const createLimiter = (windowMs: number, max: number, message: string) => {
  return rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// General API rate limiter
export const apiLimiter = createLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // limit each IP to 100 requests per windowMs
  'Too many requests from this IP, please try again after 15 minutes'
);

// Auth endpoints rate limiter (more strict)
export const authLimiter = createLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // limit each IP to 5 login attempts per windowMs
  'Too many login attempts from this IP, please try again after 15 minutes'
);

// User creation rate limiter
export const createUserLimiter = createLimiter(
  60 * 60 * 1000, // 1 hour
  3, // limit each IP to 3 account creations per hour
  'Too many accounts created from this IP, please try again after an hour'
);

// Product endpoints rate limiter
export const productLimiter = createLimiter(
  60 * 1000, // 1 minute
  30, // limit each IP to 30 requests per minute
  'Too many product requests from this IP, please try again after a minute'
); 
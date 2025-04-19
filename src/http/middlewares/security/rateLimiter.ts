import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 dakika
  max: 100,
  message: {
    success: false,
    errors: ['Too many requests, please try again later.'],
  },
});

export const signInLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: {
      success: false,
      errors: ["Too many login attempts. Please try again later."],
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
  
  export const signUpLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 2,
    message: {
      success: false,
      errors: ["Too many register attempts. Please try again later."],
    },
    standardHeaders: true,
    legacyHeaders: false,
  });


import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUserService } from '../../services/abstract/IUserService';
import { Container } from '../../provider/repository-service-provider';

interface UserPayload {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
 
   if (!req.headers.authorization) {
     return next();
   }
   
  try {

    const token=req.headers.authorization.replace('Bearer ','')

    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;

    const userService:IUserService = Container.resolve<IUserService>("UserService");
    
    const user=await userService.findById(payload.id)
    if(user){
      req.currentUser = payload;
    }
    
  } catch (err) {
    console.error("JWT verification failed:", err);
  }

  return next();
};

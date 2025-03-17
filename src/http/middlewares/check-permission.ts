import { Request, Response, NextFunction } from "express";
import User from "../../models/user";
import Permission from "../../models/permission";
import Role from "../../models/role";
import { BadRequestError } from "../../errors/bad-request-error";
import { IUserService } from "../../services/abstract/IUserService";
import { Container } from "../../provider/repository-service-provider";

export const checkPermission = (permissionName: string) => {
    return async(req: Request, res: Response, next: NextFunction) => {

      try {
        const currentUser = req.currentUser;
  
        if (!currentUser) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userService:IUserService = Container.resolve<IUserService>("UserService");

        const userRoles = await userService.getRoleWithPermissions(currentUser.id);
        if (!userRoles) {
            return res.status(404).json({ message: "User not found" });
        }
      
        const userPermissions = userRoles.permissions?.map((perm) => perm.name) ?? [];

        const rolePermissions = userRoles.roles?.flatMap((role) => 
            role.permissions?.map((perm) => perm.name) ?? []
        );
    
        const allPermissions = [...new Set([...userPermissions, ...rolePermissions||[]])];

        if (allPermissions.includes(permissionName)) {
            return next();
        }
  
        return res.status(403).json({ message: "Access denied!" });
      } catch (error) {
        throw new BadRequestError("Error")
      }
    };
};
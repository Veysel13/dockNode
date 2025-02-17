
import { Request, Response, NextFunction } from "express";

import { Container } from "../../provider/repository-service-provider";
import { IUserService } from "../../services/abstract/IUserService";
import { errorResponse, successResponse } from "../../helpers/response-handler";
import { BadRequestError } from "../../errors/bad-request-error";

export class UserController {
    private userService: IUserService;
  
    constructor() {
      this.userService = Container.resolve<IUserService>("UserService");
    }

     createUser = async (req:Request, res: Response, next:NextFunction) => {
        try {        
            const {name, lastname, email} = req.body
            const userData = {
                name: name,
                lastname: lastname,
                email: email
              };
              
            const user = await this.userService.create(req.body);
            successResponse(res, 201, 'Created user', [{user}]);
        } catch (error) {
            next(error)
        }
    }

     getAllUser = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const user = await this.userService.findAll()
            successResponse(res, 200, 'Get user', [{user}]);
        } catch (error) {        
            next('user not found')
        }
    }

     getUserById = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const user = await this.userService.findById(parseInt(req.params.id));
            if(!user) throw new BadRequestError("Not Found User"); //errorResponse(res, 404, ['Not Found User']);
            successResponse(res, 200, 'User', [{user}]);
        } catch (error) {
            next(error)
        }
    }

     updateUser = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const {name, email} = req.body
            const user = await this.userService.update(parseInt(req.params.id), req.body);
            successResponse(res, 200, 'Updated user', [{user}]);
        } catch (error) {
            next(error)
        }
    }

     deleteUser = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const user = await this.userService.delete(parseInt(req.params.id));
            successResponse(res, 200, 'Deleted user', [{user}]);
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController();
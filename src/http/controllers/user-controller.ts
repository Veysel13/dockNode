
import { Request, Response, NextFunction } from "express";

import { Container } from "../../provider/repository-service-provider";
import { IUserService } from "../../services/abstract/IUserService";
import { errorResponse, successResponse } from "../../helpers/response-handler";
import { BadRequestError } from "../../errors/bad-request-error";
import Team from "../../models/team";

export class UserController {
    private userService: IUserService;
  
    constructor() {
      this.userService = Container.resolve<IUserService>("UserService");
    }

     create = async (req:Request, res: Response, next:NextFunction) => {
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

    getAll = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const user = await this.userService.get()
            successResponse(res, 200, 'Get user', [{user}]);
        } catch (error) {        
            next('user not found')
        }
    }

     find = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const user = await this.userService.findById(parseInt(req.params.id));
            if(!user) throw new BadRequestError("Not Found User"); //errorResponse(res, 404, ['Not Found User']);
            successResponse(res, 200, 'User', [{user}]);
        } catch (error) {
            next(error)
        }
    }

    addTeam = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const user = await this.userService.findById(parseInt(req.params.id));
            if(!user) throw new BadRequestError("Not Found User"); //errorResponse(res, 404, ['Not Found User']);
            const team = await Team.findByPk(2);
            await user.addTeam(team);

            await user.addTeams([1,2]);

            // Kullanıcının takımlarını güncelle (eski takımları siler, yeni verilenleri ekler)
            await user.setTeams([1]);
            successResponse(res, 200, 'User', [{user,team,test:'dsd',d:'sw'}]);
        } catch (error) {
            next(error)
        }
    }

     update = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const {name, email} = req.body
            const user = await this.userService.update(parseInt(req.params.id), req.body);
            successResponse(res, 200, 'Updated user', [{user}]);
        } catch (error) {
            next(error)
        }
    }

     delete = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const user = await this.userService.delete(parseInt(req.params.id));
            successResponse(res, 200, 'Deleted user', []);
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController();

import { Request, Response, NextFunction } from "express";

import { Container } from "../../provider/repository-service-provider";
import { ICommentService } from "../../services/abstract/ICommentService";
import { errorResponse, successResponse } from "../../helpers/response-handler";
import { BadRequestError } from "../../errors/bad-request-error";
import sendToQueue from "../../config/rabbitmq/producer";

export class CommentController {
    private commentService: ICommentService;
  
    constructor() {
      this.commentService = Container.resolve<ICommentService>("CommentService");
    }

     create = async (req:Request, res: Response, next:NextFunction) => {
        try {        
            const {name, lastname, email} = req.body
        
            const comment = await this.commentService.create(req.body);
            
            await sendToQueue('comment_queue', req.body);
            
            successResponse(res, 201, 'Created comment', [{comment}]);
        } catch (error) {
            next(error)
        }
    }

     getAll = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const comment = await this.commentService.all()
            successResponse(res, 200, 'Get comment', [{comment}]);
        } catch (error) {        
            next('comment not found')
        }
    }

     find = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const comment = await this.commentService.findById(parseInt(req.params.id));
            if(!comment) throw new BadRequestError("Not Found comment"); //errorResponse(res, 404, ['Not Found comment']);
            successResponse(res, 200, 'Comment', [{comment}]);
        } catch (error) {
            next(error)
        }
    }

     update = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const {name, email} = req.body
            const comment = await this.commentService.update(parseInt(req.params.id), req.body);
            successResponse(res, 200, 'Updated comment', [{comment}]);
        } catch (error) {
            next(error)
        }
    }

     delete = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const comment = await this.commentService.delete(parseInt(req.params.id));
            successResponse(res, 200, 'Deleted comment', []);
        } catch (error) {
            next(error)
        }
    }
}

export default new CommentController();
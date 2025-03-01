
import { Request, Response, NextFunction } from "express";
import { Container } from "../../provider/repository-service-provider";
import { IPostService } from "../../services/abstract/IPostService";
import { errorResponse, successResponse } from "../../helpers/response-handler";
import { BadRequestError } from "../../errors/bad-request-error";
import sendToQueue from "../../rabbitmq/producer";

export class PostController {
    private postService: IPostService;
  
    constructor() {
      this.postService = Container.resolve<IPostService>("PostService");
    }

     create = async (req:Request, res: Response, next:NextFunction) => {
        try {        
            req.body.userId = req.currentUser?.id; 

            const post = await this.postService.create(req.body);

            await sendToQueue('post_queue', req.body);

            successResponse(res, 201, 'Created post', [{post}]);
        } catch (error) {
            next(error)
        }
    }

     getAll = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const post = await this.postService.get()
            successResponse(res, 200, 'Get post', [{post}]);
        } catch (error) { 
            next('Post not found')
        }
    }

     find = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const post = await this.postService.findById(parseInt(req.params.id), true);
            if(!post) throw new BadRequestError("Not Found Post"); //errorResponse(res, 404, ['Not Found User']);

            successResponse(res, 200, 'Post', [{post}]);
        } catch (error) {
            next(error)
        }
    }

     update = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const post = await this.postService.update(parseInt(req.params.id), req.body);
            successResponse(res, 200, 'Updated post', [{post}]);
        } catch (error) {
            next(error)
        }
    }

     delete = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const post = await this.postService.delete(parseInt(req.params.id));
            successResponse(res, 200, 'Deleted post', []);
        } catch (error) {
            next(error)
        }
    }
}

export default new PostController();
import Comment from "../../models/comment";
import { Container } from "../../provider/repository-service-provider";
import { ICommentRepository } from "../../repository/abstract/ICommentRepository";
import { ICommentService } from "../abstract/ICommentService";

export class CommentService<T> implements ICommentService {
  
    private commentRepository: ICommentRepository;
  
    constructor() {
      this.commentRepository = Container.resolve<ICommentRepository>("CommentRepository");
    }

    async findById(id: number): Promise<Comment | null> {
        return await this.commentRepository.findById(id);
    }

    async get(): Promise<Comment[] | null> {
        return await this.commentRepository.getWithRelation();
    }

    async create(data: Partial<T>): Promise<T> {
        return await this.commentRepository.create(data);
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        return await this.commentRepository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        return await this.commentRepository.delete(id);
    }

}

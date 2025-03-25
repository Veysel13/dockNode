import Post from "../../models/post";
import { Container } from "../../provider/repository-service-provider";
import { IPostRepository } from "../../repository/abstract/IPostRepository";
import { IPostService } from "../abstract/IPostService";

export class PostService<T> implements IPostService {
  
    private postRepository: IPostRepository;
  
    constructor() {
      this.postRepository = Container.resolve<IPostRepository>("PostRepository");
    }

    async findById(id: number, withRelation = false): Promise<Post | null> {
        return await this.postRepository.findById(id, withRelation);
    }

    async get(filters: {ids?: number[], userIds?: number[], userId?: number, title?: string }, attributes?: string[]): Promise<Post[] | null>{
        return await this.postRepository.get(filters, attributes);
    }

    async all(): Promise<Post[] | null> {
        return await this.postRepository.all();
    }

    async create(data: Partial<T>): Promise<T> {
        return await this.postRepository.create(data);
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        return await this.postRepository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        return await this.postRepository.delete(id);
    }

}

import Post from "../../models/post";
import { Container } from "../../provider/repository-service-provider";
import { IPostRepository } from "../../repository/abstract/IPostRepository";
import { IPostService } from "../abstract/IPostService";

export class PostService<T> implements IPostService {
  
    private postRepository: IPostRepository;
  
    constructor() {
      this.postRepository = Container.resolve<IPostRepository>("PostRepository");
    }

    async findById(id: number): Promise<Post | null> {
        return await this.postRepository.findById(id);
    }

    async get(): Promise<Post[] | null> {
        return await this.postRepository.getWithRelation();
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

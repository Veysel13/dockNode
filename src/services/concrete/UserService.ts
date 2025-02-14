import { Container } from "../../provider/repository-service-provider";
import { IUserRepository } from "../../repository/abstract/IUserRepository";
import { IUserService } from "../abstract/IUserService";

export class UserService<T> implements IUserService {
  
    private userRepository: IUserRepository;
  
    constructor() {
      this.userRepository = Container.resolve<IUserRepository>("UserRepository");
    }

    async findById(id: number): Promise<T | null> {
        return await this.userRepository.findById(id);
    }

    async findAll(): Promise<T[]> {
        return await this.userRepository.findAll();
    }

    async create(data: Partial<T>): Promise<T> {
        return await this.userRepository.create(data);
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        return await this.userRepository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        return await this.userRepository.delete(id);
    }

}

import User from "../../models/user";
import { Container } from "../../provider/repository-service-provider";
import { IUserRepository } from "../../repository/abstract/IUserRepository";
import { IUserService } from "../abstract/IUserService";

export class UserService<T> implements IUserService {
  
    private userRepository: IUserRepository;
  
    constructor() {
      this.userRepository = Container.resolve<IUserRepository>("UserRepository");
    }

    async findById(id: number, withRelation:boolean = false): Promise<User | null> {
        return await this.userRepository.findById(id, withRelation);
    }

    async get(): Promise<User[] | null> {
        return await this.userRepository.getWithRelation()
    }

    async findByEmail(email:string, scopes: string[] = []): Promise<User | null> {
        return await this.userRepository.findByEmail(email, scopes);
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

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

    async get(filters: { ids?: number[], email?: string, otherField?: any }, attributes?: string[]): Promise<User[] | null> {
        return await this.userRepository.get(filters, attributes)
    }

    async all(): Promise<User[] | null> {
        return await this.userRepository.all()
    }

    async getRoleWithPermissions(id:number): Promise<User | null> {
        return await this.userRepository.getRoleWithPermissions(id)
    }

    async findByEmail(email:string, scopes: string[] = []): Promise<User | null> {
        return await this.userRepository.findByEmail(email, scopes);
    }

    async create(data: Partial<T>): Promise<T> {
        const user = await this.userRepository.create(data);
        return user;
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        const user = await this.userRepository.update(id, data);
        return user;
    }

    async delete(id: number): Promise<void> {
        return await this.userRepository.delete(id); 
    }

}

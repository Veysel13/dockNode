import { UserRepository } from "../repository/concrete/UserRepository";
import { IUserRepository } from "../repository/abstract/IUserRepository";
import { IUserService } from "../services/abstract/IUserService";
import { UserService } from "../services/concrete/UserService";

class Container {
  private static instances: Map<string, any> = new Map();

  static register<T>(key: string, instance: T) {
    this.instances.set(key, instance);
  }

  static resolve<T>(key: string): T {
    return this.instances.get(key);
  }
}

// repository
Container.register<IUserRepository>("UserRepository", new UserRepository());

// service
Container.register<IUserService>("UserService", new UserService());

export { Container };
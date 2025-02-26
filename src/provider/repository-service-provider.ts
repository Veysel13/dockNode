import { UserRepository } from "../repository/concrete/UserRepository";
import { IUserRepository } from "../repository/abstract/IUserRepository";
import { IUserService } from "../services/abstract/IUserService";
import { UserService } from "../services/concrete/UserService";
import { IPostRepository } from "../repository/abstract/IPostRepository";
import { PostRepository } from "../repository/concrete/PostRepository";
import { IPostService } from "../services/abstract/IPostService";
import { PostService } from "../services/concrete/PostService";
import { ICommentRepository } from "../repository/abstract/ICommentRepository";
import { CommentRepository } from "../repository/concrete/CommentRepository";
import { ICommentService } from "../services/abstract/ICommentService";
import { CommentService } from "../services/concrete/CommentService";

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
Container.register<IPostRepository>("PostRepository", new PostRepository());
Container.register<ICommentRepository>("CommentRepository", new CommentRepository());


// service
Container.register<IUserService>("UserService", new UserService());
Container.register<IPostService>("PostService", new PostService());
Container.register<ICommentService>("CommentService", new CommentService());


export { Container };
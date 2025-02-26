import { IUserRepository } from "../abstract/IUserRepository";
import { BaseRepository } from "./base/BaseRepository";
import User from "../../models/user";
import Post from "../../models/post";
import Comment from "../../models/comment";


export class UserRepository<T> extends BaseRepository<any> implements IUserRepository {
  
    constructor() {
        super(User);
    }

    async getWithRelation(): Promise<User[] | null> {
      return await this.model.findAll({
        include: [
          {
            model: Post,
            as: "posts",
            attributes: ["id", "title", "description"],
            include: [
                {
                  model: Comment,
                  as: "comments",
                  attributes: ["id", "description", "rating"]
                }
              ],
          }
        ],
        order: [["id", "DESC"]],
      });
    }

    async findByEmail(email:string, scopes: string[] = []): Promise<User | null>  {
      const scopedModel = scopes.length ? this.model.scope(...scopes) : this.model;
      return await scopedModel.findOne({ where: { email } });
    }

}

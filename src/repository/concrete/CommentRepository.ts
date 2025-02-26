// repositories/UserRepository.ts
import { ICommentRepository } from "../abstract/ICommentRepository";
import { BaseRepository } from "./base/BaseRepository";
import Comment from "../../models/comment";
import Post from "../../models/post";


export class CommentRepository extends BaseRepository<any> implements ICommentRepository {
  
    constructor() {
        super(Comment);
    }

    async getWithRelation(): Promise<Comment[] | null> {
      return await this.model.findAll({
        include: [
          {
            model: Post,
            as: "post",
            attributes: ["id", "title", "description"]
          }
        ],
        order: [["id", "DESC"]],
      });
    }

}

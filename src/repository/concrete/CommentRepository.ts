import { ICommentRepository } from "../abstract/ICommentRepository";
import { BaseRepository } from "./base/BaseRepository";
import Comment from "../../models/comment";
import Post from "../../models/post";
import { Op } from "sequelize";


export class CommentRepository<T> extends BaseRepository<Comment> implements ICommentRepository {
  
    constructor() {
        super(Comment);
    }

    async get(filters: { postIds?: number[] }, attributes?: string[]): Promise<Comment[] | null> {
      const whereClause: any = {};
  
      if (filters.postIds) {
        whereClause.postId = { [Op.in]: filters.postIds };
      }
  
      return await this.model.findAll({
        attributes,
        where: whereClause
      });
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

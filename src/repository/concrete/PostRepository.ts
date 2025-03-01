import { IPostRepository } from "../abstract/IPostRepository";
import { BaseRepository } from "./base/BaseRepository";
import Post from "../../models/post";
import User from "../../models/user";
import Comment from "../../models/comment";
import { Sequelize } from 'sequelize';


export class PostRepository extends BaseRepository<any> implements IPostRepository {
  
    constructor() {
        super(Post);
    }

    async getWithRelation(): Promise<Post[] | null>  {
        return await this.model.findAll({
            attributes: {
                include: [
                    [Sequelize.literal(`(
                        SELECT COALESCE(AVG("comments"."rating"), 0)
                        FROM "comments"
                        WHERE "comments"."post_id" = "Post"."id"
                    )`), "averageRating"]
                ]
            },
            include: [{
                    model: User,
                    as:'user',
                    attributes: ["id", "name", "email"]
                },
                {
                    model: Comment,
                    as:'comments',
                    attributes: ["id", "description", "rating"],
                    required: false
                }],
            order: [["averageRating", "DESC"]],
        });
    }

    async findById(id: number, withRelation?: boolean): Promise<any> {
    
        if (withRelation) {
            return  await this.model.findByPk(id, {
              include: [{ model: User, as: "user" }],
            });
          }
          return await this.model.findByPk(id);
    }

}

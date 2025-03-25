import Comment from "../../models/comment";
import { IInterface } from "./base/IInterface";

export interface ICommentRepository extends IInterface{
  get(filters: { postIds?: number[]}, attributes?: string[]): Promise<Comment[] | null>;
  getWithRelation(): Promise<Comment[] | null>;
}
  
import Comment from "../../models/comment";
import { IInterface } from "./base/IInterface";

export interface ICommentRepository extends IInterface{
  getWithRelation(): Promise<Comment[] | null>;
}
  
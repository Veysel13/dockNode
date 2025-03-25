import { IService } from "./base/IService";
import Comment from "../../models/comment";

export interface ICommentService extends IService {
  get(filters: { postIds?: number[] }, attributes?: string[]): Promise<Comment[] | null>;
}
import Post from "../../models/post";
import { IService } from "./base/IService";

export interface IPostService extends IService{
  get(filters: {ids?: number[], userIds?: number[], userId?: number, title?: string }, attributes?: string[]): Promise<Post[] | null>;
}
  
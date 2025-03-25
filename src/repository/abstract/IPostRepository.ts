import Post from "../../models/post";
import { IInterface } from "./base/IInterface";

export interface IPostRepository extends IInterface{
  get(filters: {ids?: number[], userIds?: number[], userId?: number, title?: string }, attributes?: string[]): Promise<Post[] | null>;
  getWithRelation(): Promise<Post[] | null>;
  }
  
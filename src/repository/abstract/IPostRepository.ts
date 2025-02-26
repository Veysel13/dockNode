import Post from "../../models/post";
import { IInterface } from "./base/IInterface";

export interface IPostRepository extends IInterface{
  getWithRelation(): Promise<Post[] | null>;
  }
  
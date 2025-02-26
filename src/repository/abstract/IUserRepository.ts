import User from "../../models/user";
import { IInterface } from "./base/IInterface";

export interface IUserRepository extends IInterface{
  getWithRelation(): Promise<User[] | null>;
  findByEmail(email:string, scopes?: string[]): Promise<User | null>;
  }
  
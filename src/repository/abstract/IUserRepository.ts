import User from "../../models/user";
import { IInterface } from "./base/IInterface";

export interface IUserRepository extends IInterface{
  get(filters: { ids?: number[], email?: string, otherField?: any }, attributes?: string[]): Promise<User[] | null>;
  getWithRelation(): Promise<User[] | null>;
  getRoleWithPermissions(id:number): Promise<User | null>;
  findByEmail(email:string, scopes?: string[]): Promise<User | null>;
}
  
import User from "../../models/user";
import { IService } from "./base/IService";

export interface IUserService extends IService{
  get(filters: { ids?: number[], email?: string, otherField?: any }, attributes?: string[]): Promise<User[] | null>;
  getRoleWithPermissions(id:number): Promise<User | null> ;
  findByEmail(email:string, scopes?: string[]): Promise<User | null>;
}
  
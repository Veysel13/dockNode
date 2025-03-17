import User from "../../models/user";
import { IService } from "./base/IService";

export interface IUserService extends IService{
  getRoleWithPermissions(id:number): Promise<User | null> ;
  findByEmail(email:string, scopes?: string[]): Promise<User | null>;
}
  
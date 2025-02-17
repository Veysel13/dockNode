// repositories/UserRepository.ts
import { IUserRepository } from "../abstract/IUserRepository";
import { BaseRepository } from "./base/BaseRepository";
import User from "../../models/user";


export class UserRepository extends BaseRepository<any> implements IUserRepository {
  
    constructor() {
        super(User);
    }

}

// repositories/UserRepository.ts
import { IUserRepository } from "../abstract/IUserRepository";
import { BaseRepository } from "./base/BaseRepository";
const { User } = require('../../models');

export class UserRepository extends BaseRepository<any> implements IUserRepository {
  
    constructor() {
        super(User);
    }

}

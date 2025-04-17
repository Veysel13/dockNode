import { Request, Response, NextFunction, RequestHandler } from "express";
import { IUserService } from "../../../services/abstract/IUserService";
import { Container } from "../../../provider/repository-service-provider";
import { BadRequestError } from "../../../errors/bad-request-error";
import { successResponse } from "../../../helpers/response-handler";

class SignupController {
  private userService: IUserService;

  constructor() {
    this.userService = Container.resolve<IUserService>("UserService");
  }

 signup: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { name, lastname, email, password } = req.body;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestError(res.__('errors.email_exist'));
    }

    const createUser = await this.userService.create({ name, lastname, email, password });
    const user       = await this.userService.findByEmail(email);

    const userJwt   = await user?.generateToken();

    successResponse(res, 201, 'Created User', { user: user, token: userJwt });
  } catch (err) {
    next(err);
  }
};

}

export default new SignupController();

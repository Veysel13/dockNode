import { Request, Response, NextFunction, RequestHandler } from "express";
import { IUserService } from "../../../services/abstract/IUserService";
import { Container } from "../../../provider/repository-service-provider";
import { BadRequestError } from "../../../errors/bad-request-error";
import { Password } from "../../../helpers/password";


class SigninController {
  private userService: IUserService;

  constructor() {
    this.userService = Container.resolve<IUserService>("UserService");
  }

 signin: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const existingUser = await this.userService.findByEmail(email, ['withPassword']);
    if (!existingUser) {
      throw new BadRequestError(res.__('errors.invalid_credential'));
    }


    const passwordsMatch = await Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
      throw new BadRequestError(res.__('errors.invalid_credential'));
    }

    const userJwt = await existingUser.generateToken()

    res.status(200).send({ user: existingUser, token: userJwt });
  } catch (err) {
    next(err);
  }
 };

}

export default new SigninController();

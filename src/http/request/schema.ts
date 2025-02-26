import userRequest from "./user/user-request";
import postRequest from "./post/post-request";
import commentRequest from "./comment/comment-request";
import signupRequestSchema from "./auth/signup-request";

import { ObjectSchema } from "joi";
import siginRequestSchema from "./auth/signin-request";

const schemas: Record<string, ObjectSchema> = {
  userRequest: userRequest,
  postRequest: postRequest,
  commentRequest:commentRequest,
  signupRequestSchema:signupRequestSchema,
  siginRequestSchema:siginRequestSchema
};

export default schemas;

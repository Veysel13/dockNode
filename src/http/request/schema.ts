import userRequest from "./user/user-request";
import postRequest from "./post/post-request";
import commentRequest from "./comment/comment-request";
import commentUpdateRequest from "./comment/comment-update-request";
import signupRequestSchema from "./auth/signup-request";

import { ObjectSchema } from "joi";
import siginRequestSchema from "./auth/signin-request";

const schemas: Record<string, ObjectSchema> = {
  userRequest: userRequest,
  postRequest: postRequest,
  commentRequest:commentRequest,
  commentUpdateRequest:commentUpdateRequest,
  signupRequestSchema:signupRequestSchema,
  siginRequestSchema:siginRequestSchema
};

export default schemas;

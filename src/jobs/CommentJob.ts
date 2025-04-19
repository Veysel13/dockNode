import { Container } from "../provider/repository-service-provider";
import { ICommentService } from "../services/abstract/ICommentService";
import { BaseJob } from "./BaseJob";

export default class CommentJob extends BaseJob {
  queueName = "comment_queue";

  async process(data: any) {
    const commentService = Container.resolve<ICommentService>("CommentService");
    await commentService.create(data);
    console.log(`Processing CommentJob: ${JSON.stringify(data)}`);
  }
}

import { Container } from "../provider/repository-service-provider";
import { IPostService } from "../services/abstract/IPostService";
import { BaseJob } from "./BaseJob";

export default class PostJob extends BaseJob {
  queueName = "post_queue";

  async process(data: any) {
    const postService = Container.resolve<IPostService>("PostService");
    //await postService.create(data);
    console.log(`Processing PostJob: ${JSON.stringify(data)}`);
  }
}

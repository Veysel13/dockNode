export abstract class BaseJob {
    abstract queueName: string;
    abstract process(data: any): Promise<void>;
  }
  

export interface IService {
  findById(id: number, withRelation?: boolean): Promise<any | null>;
  all(): Promise<any[] | null>;
  create(data: any): Promise<any>;
  update(id: number, data: any): Promise<any>;
  delete(id: number): Promise<void>;
  }
  
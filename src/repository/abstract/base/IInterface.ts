
export interface IInterface {
    findById(id: number): Promise<any | null>;
    get(): Promise<any[] | null>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<void>;
  }
  
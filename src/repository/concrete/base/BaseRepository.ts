import User from "../../../models/user";

export abstract class BaseRepository<T> {
    protected model: any;

    constructor(model: any) {
        this.model = model;
    }

    async findById(id: number,  withRelation: boolean = false): Promise<T | null> {
        return await this.model.findByPk(id);
    }

    async all(): Promise<T[]> {
        return await this.model.findAll();
    }

    async create(data: Partial<T>): Promise<User> {
        return await this.model.create(data);
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        const item = await this.model.findByPk(id);
        if (!item) throw new Error(`${this.model.name} not found`);
        return await item.update(data);
    }

    async delete(id: number): Promise<void> {
        const item = await this.model.findByPk(id);
        if (!item) throw new Error(`${this.model.name} not found`);
        await item.destroy();
    }
}

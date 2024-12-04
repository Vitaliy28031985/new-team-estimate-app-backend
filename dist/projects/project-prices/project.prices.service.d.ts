import { Model, Types } from 'mongoose';
import { Project } from 'src/mongo/schemas/project/project.schema';
import { PricesDto } from 'src/prices/price.dto';
import { PositionsService } from '../positions/positions.service';
export declare class ProjectPricesService {
    private projectModel;
    private readonly positionsService;
    constructor(projectModel: Model<Project>, positionsService: PositionsService);
    createPrice(dto: PricesDto, projectId: Types.ObjectId): Promise<import("mongoose").Document<unknown, {}, Project> & Project & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    }>;
    updatePrice(dto: PricesDto, projectId: Types.ObjectId, priceId: string): Promise<{
        message: string;
    }>;
    removePrice(projectId: Types.ObjectId, priceId: string): Promise<{
        message: string;
    }>;
}

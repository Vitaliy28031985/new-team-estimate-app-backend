import { ProjectPricesService } from './project.prices.service';
import { PricesDto } from 'src/prices/price.dto';
import { Types } from 'mongoose';
export declare class ProjectPricesController {
    private readonly projectPricesService;
    constructor(projectPricesService: ProjectPricesService);
    create(dto: PricesDto, projectId: string): Promise<import("mongoose").Document<unknown, {}, import("../../mongo/schemas/project/project.schema").Project> & import("../../mongo/schemas/project/project.schema").Project & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    }>;
    update(dto: PricesDto, projectId: string, priceId: string): Promise<{
        message: string;
    }>;
    remove(projectId: string, priceId: string): Promise<{
        message: string;
    }>;
}

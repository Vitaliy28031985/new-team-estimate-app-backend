import { Model, Types } from 'mongoose';
import { Project } from 'src/mongo/schemas/project/project.schema';
import { ProjectPricesService } from '../project-prices/project.prices.service';
import { PricesDto } from 'src/prices/price.dto';
import { LowPositionService } from '../low-estimate/low-position/low.position.service';
export declare class LowProjectPriceService {
    private projectModel;
    private readonly projectPricesService;
    private readonly lowPositionService;
    constructor(projectModel: Model<Project>, projectPricesService: ProjectPricesService, lowPositionService: LowPositionService);
    createPrice(dto: PricesDto, projectId: Types.ObjectId): Promise<{
        id: Types.ObjectId;
        title: string;
        price: number;
        updateAllow: boolean;
    }>;
    updatePrice(dto: PricesDto, projectId: Types.ObjectId, priceId: string): Promise<{
        message: string;
    }>;
    removePrice(projectId: Types.ObjectId, priceId: string): Promise<{
        message: string;
    }>;
}

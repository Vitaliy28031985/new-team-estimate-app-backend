import { Model, Types } from 'mongoose';
import { Project } from 'src/mongo/schemas/project/project.schema';
import { PositionsService } from '../positions/positions.service';
import { EstimateDto } from './estimate.dto';
export declare class EstimatesService {
    private projectModel;
    private readonly positionsService;
    constructor(projectModel: Model<Project>, positionsService: PositionsService);
    createEstimate(dto: EstimateDto, projectId: Types.ObjectId): Promise<Project>;
    updateEstimated(dto: EstimateDto, projectId: Types.ObjectId, estimateId: Types.ObjectId): Promise<Project>;
    removeEstimate(projectId: Types.ObjectId, estimateId: Types.ObjectId): Promise<{
        message: string;
    }>;
}

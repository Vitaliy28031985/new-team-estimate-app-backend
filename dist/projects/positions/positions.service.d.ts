import { Model, Types } from 'mongoose';
import { Project } from 'src/mongo/schemas/project/project.schema';
import { CreatePositionDto } from './position-dto/position.create.dto';
export declare class PositionsService {
    private projectModel;
    constructor(projectModel: Model<Project>);
    createPosition(dto: CreatePositionDto, projectId: Types.ObjectId, estimateId: Types.ObjectId): Promise<{
        message: string;
    }>;
    updatePosition(dto: CreatePositionDto, projectId: Types.ObjectId, estimateId: Types.ObjectId, positionId: string): Promise<{
        message: string;
    }>;
    removePosition(projectId: Types.ObjectId, estimateId: Types.ObjectId, positionId: string): Promise<{
        message: string;
    }>;
    getTotal(projectId: Types.ObjectId): Promise<void>;
    getResults(projectId: Types.ObjectId): Promise<void>;
}

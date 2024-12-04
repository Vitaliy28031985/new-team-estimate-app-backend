import { Model, Types } from 'mongoose';
import { Project } from 'src/mongo/schemas/project/project.schema';
import { EstimatesService } from 'src/projects/estimates/estimates.service';
import { CreatePositionDto } from 'src/projects/positions/position-dto/position.create.dto';
import { PositionsService } from 'src/projects/positions/positions.service';
import { SettingProjectService } from 'src/projects/setting-project/setting.project.service';
export declare class LowPositionService {
    private projectModel;
    private readonly estimatesService;
    private readonly positionsService;
    readonly settingService: SettingProjectService;
    constructor(projectModel: Model<Project>, estimatesService: EstimatesService, positionsService: PositionsService, settingService: SettingProjectService);
    createPosition(dto: CreatePositionDto, projectId: Types.ObjectId, estimateId: Types.ObjectId): Promise<{
        message: string;
    }>;
    updatePosition(dto: CreatePositionDto, projectId: Types.ObjectId, estimateId: Types.ObjectId, positionId: string): Promise<{
        message: string;
    }>;
    removePosition(projectId: Types.ObjectId, estimateId: Types.ObjectId, positionId: string): Promise<{
        message: string;
    }>;
}

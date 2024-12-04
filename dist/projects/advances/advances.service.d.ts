import { Model, Types } from 'mongoose';
import { Project } from 'src/mongo/schemas/project/project.schema';
import { PositionsService } from '../positions/positions.service';
import { AdvanceDto } from './advance.dto';
import { SettingProjectService } from '../setting-project/setting.project.service';
export declare class AdvancesService {
    private projectModel;
    private readonly positionsService;
    private readonly settingService;
    constructor(projectModel: Model<Project>, positionsService: PositionsService, settingService: SettingProjectService);
    createAdvances(dto: AdvanceDto, projectId: Types.ObjectId): Promise<{
        message: string;
    }>;
    updateAdvance(dto: AdvanceDto, projectId: Types.ObjectId, advancesId: string): Promise<{
        message: string;
    }>;
    removeAdvance(projectId: Types.ObjectId, advancesId: string): Promise<{
        message: string;
    }>;
    getTotal(projectId: Types.ObjectId): Promise<void>;
}

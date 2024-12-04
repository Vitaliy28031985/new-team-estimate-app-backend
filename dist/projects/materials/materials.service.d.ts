import { Model, Types } from 'mongoose';
import { Project } from 'src/mongo/schemas/project/project.schema';
import { PositionsService } from '../positions/positions.service';
import { MaterialDto } from './material.dto';
import { SettingProjectService } from '../setting-project/setting.project.service';
export declare class MaterialsService {
    private projectModel;
    private readonly positionsService;
    private readonly settingService;
    constructor(projectModel: Model<Project>, positionsService: PositionsService, settingService: SettingProjectService);
    createMaterial(dto: MaterialDto, projectId: Types.ObjectId): Promise<{
        message: string;
    }>;
    updateMaterial(dto: MaterialDto, projectId: Types.ObjectId, materialsId: string): Promise<{
        message: string;
    }>;
    remove(projectId: Types.ObjectId, materialsId: string): Promise<{
        message: string;
    }>;
    getTotal(projectId: Types.ObjectId): Promise<void>;
}

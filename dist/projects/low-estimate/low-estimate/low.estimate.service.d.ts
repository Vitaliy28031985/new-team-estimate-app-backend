import { Model, Types } from 'mongoose';
import { Project } from 'src/mongo/schemas/project/project.schema';
import { EstimateDto } from 'src/projects/estimates/estimate.dto';
import { EstimatesService } from 'src/projects/estimates/estimates.service';
import { SettingProjectService } from 'src/projects/setting-project/setting.project.service';
export declare class LowEstimateService {
    private projectModel;
    private readonly estimatesService;
    private readonly settingService;
    constructor(projectModel: Model<Project>, estimatesService: EstimatesService, settingService: SettingProjectService);
    createLowEstimate(dto: EstimateDto, projectId: Types.ObjectId): Promise<Project>;
    updateEstimated(dto: EstimateDto, projectId: Types.ObjectId, estimateId: Types.ObjectId): Promise<Project>;
    removeEstimateLow(projectId: Types.ObjectId, estimateId: Types.ObjectId): Promise<{
        message: string;
    }>;
}

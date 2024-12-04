import { LowEstimateService } from './low.estimate.service';
import { EstimateDto } from 'src/projects/estimates/estimate.dto';
export declare class LowEstimateController {
    private readonly lowEstimateService;
    constructor(lowEstimateService: LowEstimateService);
    create(dto: EstimateDto, projectId: string): Promise<import("../../../mongo/schemas/project/project.schema").Project>;
    update(dto: EstimateDto, projectId: string, estimateId: string): Promise<import("../../../mongo/schemas/project/project.schema").Project>;
    remove(projectId: string, estimateId: string): Promise<{
        message: string;
    }>;
}

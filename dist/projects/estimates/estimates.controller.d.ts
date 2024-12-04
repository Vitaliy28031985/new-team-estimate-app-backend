import { EstimatesService } from './estimates.service';
import { EstimateDto } from './estimate.dto';
export declare class EstimatesController {
    private readonly estimatesService;
    constructor(estimatesService: EstimatesService);
    create(dto: EstimateDto, projectId: string): Promise<import("../../mongo/schemas/project/project.schema").Project>;
    update(dto: EstimateDto, projectId: string, estimateId: string): Promise<import("../../mongo/schemas/project/project.schema").Project>;
    remove(projectId: string, estimateId: string): Promise<{
        message: string;
    }>;
}

import { LowPositionService } from './low.position.service';
import { CreatePositionDto } from 'src/projects/positions/position-dto/position.create.dto';
export declare class LowPositionController {
    private readonly lowPositionService;
    constructor(lowPositionService: LowPositionService);
    create(dto: CreatePositionDto, projectId: string, estimateId: string): Promise<{
        message: string;
    }>;
    update(dto: CreatePositionDto, projectId: string, estimateId: string, positionId: string): Promise<void>;
    remove(projectId: string, estimateId: string, positionId: string): Promise<{
        message: string;
    }>;
}

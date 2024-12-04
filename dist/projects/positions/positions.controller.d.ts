import { PositionsService } from './positions.service';
import { CreatePositionDto } from './position-dto/position.create.dto';
export declare class PositionsController {
    private readonly positionsService;
    constructor(positionsService: PositionsService);
    create(dto: CreatePositionDto, projectId: string, estimateId: string): Promise<{
        message: string;
    }>;
    update(dto: CreatePositionDto, projectId: string, estimateId: string, positionId: string): Promise<void>;
    remove(projectId: string, estimateId: string, positionId: string): Promise<{
        message: string;
    }>;
}

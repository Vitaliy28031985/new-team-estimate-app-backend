import { AdvancesService } from './advances.service';
import { AdvanceDto } from './advance.dto';
export declare class AdvancesController {
    private readonly advancesService;
    constructor(advancesService: AdvancesService);
    create(dto: AdvanceDto, projectId: string): Promise<{
        message: string;
    }>;
    update(dto: AdvanceDto, projectId: string, advancesId: string): Promise<{
        message: string;
    }>;
    remove(projectId: string, advancesId: string): Promise<void>;
}

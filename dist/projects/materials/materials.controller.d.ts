import { MaterialsService } from './materials.service';
import { MaterialDto } from './material.dto';
export declare class MaterialsController {
    private readonly materialsService;
    constructor(materialsService: MaterialsService);
    create(dto: MaterialDto, projectId: string): Promise<{
        message: string;
    }>;
    update(dto: MaterialDto, projectId: string, materialsId: string): Promise<void>;
    remove(projectId: string, materialsId: string): Promise<void>;
}

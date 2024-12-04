import { SettingProjectService } from './setting.project.service';
import { AddAllowDto } from './dto/add.allow.dto';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { Types } from 'mongoose';
import { DeleteAllowDto } from './dto/delete.dto';
import { DiscountDto } from './dto/discount.dto';
export declare class SettingProjectController {
    private readonly settingProjectService;
    constructor(settingProjectService: SettingProjectService);
    addAllowProject(allowDto: AddAllowDto, projectId: string, req: RequestWithUser): Promise<{
        message: string;
        projectId: Types.ObjectId;
        userId: string;
    }>;
    updateAllowProject(allowDto: AddAllowDto, projectId: string, req: RequestWithUser): Promise<{
        message: string;
        projectId: Types.ObjectId;
        userId: string;
    }>;
    deleteAllowProject(allowDto: DeleteAllowDto, projectId: string, req: RequestWithUser): Promise<{
        message: string;
        projectId: Types.ObjectId;
        userId: string;
    }>;
    addDiscount(dto: DiscountDto, projectId: string): Promise<{
        message: string;
    }>;
    addLowEstimates(dto: DiscountDto, projectId: string, req: RequestWithUser): Promise<{
        message: string;
    }>;
}

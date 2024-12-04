import { Model, Types } from 'mongoose';
import { Project } from 'src/mongo/schemas/project/project.schema';
import { User } from 'src/mongo/schemas/user/user.schema';
import { AddAllowDto } from './dto/add.allow.dto';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { DeleteAllowDto } from './dto/delete.dto';
import { PositionsService } from '../positions/positions.service';
import { Price } from 'src/mongo/schemas/price.schema';
import { DiscountDto } from './dto/discount.dto';
export declare class SettingProjectService {
    private projectModel;
    private userModel;
    private readonly positionsService;
    private priceModel;
    constructor(projectModel: Model<Project>, userModel: Model<User>, positionsService: PositionsService, priceModel: Model<Price>);
    addAllowProject(allowDto: AddAllowDto, projectId: Types.ObjectId, req: RequestWithUser): Promise<{
        message: string;
        projectId: Types.ObjectId;
        userId: string;
    }>;
    updateProjectAllow(allowDto: AddAllowDto, projectId: Types.ObjectId, req: RequestWithUser): Promise<{
        message: string;
        projectId: Types.ObjectId;
        userId: string;
    }>;
    deleteAllowProject(allowDto: DeleteAllowDto, projectId: Types.ObjectId, req: RequestWithUser): Promise<{
        message: string;
        projectId: Types.ObjectId;
        userId: string;
    }>;
    addDiscount(dto: DiscountDto, projectId: Types.ObjectId): Promise<{
        message: string;
    }>;
    addLowEstimates(dto: DiscountDto, projectId: Types.ObjectId, req: RequestWithUser): Promise<{
        message: string;
    }>;
    getTotal(projectId: Types.ObjectId): Promise<void>;
    getResults(projectId: Types.ObjectId): Promise<void>;
}

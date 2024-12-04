import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Model } from 'mongoose';
import { Project } from 'src/mongo/schemas/project/project.schema';
export declare class ProjectLowGuard implements CanActivate {
    private projectModel;
    constructor(projectModel: Model<Project>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

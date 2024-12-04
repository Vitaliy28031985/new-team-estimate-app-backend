import { NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { User } from 'src/mongo/schemas/user/user.schema';
export declare class AuthMiddleware implements NestMiddleware {
    private userModel;
    private readonly secretKey;
    constructor(userModel: Model<User>);
    use(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}

import { Model } from 'mongoose';
import { EmailService } from 'src/email/email.service';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { UserGet } from 'src/interfaces/userGet';
import { User } from 'src/mongo/schemas/user/user.schema';
import { UserUpdateEmailDto } from './dtos/user.update.email.dto';
import { UserUpdatePhone } from './dtos/user.update.phone.dto';
import { UserUpdatePassword } from './dtos/user.update.password.dto';
import { UserUpdateRoleDto } from './dtos/user.update.role.dto';
import { UserUpdateName } from './dtos/user.update.name.dto';
export declare class UserService {
    private userModel;
    private readonly emailService;
    constructor(userModel: Model<User>, emailService: EmailService);
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    })[]>;
    getCurrentUser(req: RequestWithUser): Promise<UserGet>;
    changeName(dto: UserUpdateName, req: RequestWithUser): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    changeEmail(dto: UserUpdateEmailDto, req: RequestWithUser): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    verifyEmail(verificationToken: string): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    changePhone(dto: UserUpdatePhone, req: RequestWithUser): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    changeRole(dto: UserUpdateRoleDto, req: RequestWithUser): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    changePassword(dto: UserUpdatePassword, req: RequestWithUser): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    changeAvatar(file: Express.Multer.File, req: RequestWithUser): Promise<{
        message: string;
    }>;
}

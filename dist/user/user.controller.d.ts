import { UserService } from './user.service';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { UserUpdateEmailDto } from './dtos/user.update.email.dto';
import { UserUpdatePhone } from './dtos/user.update.phone.dto';
import { UserUpdatePassword } from './dtos/user.update.password.dto';
import { UserUpdateRoleDto } from './dtos/user.update.role.dto';
import { UserUpdateName } from './dtos/user.update.name.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, import("../mongo/schemas/user/user.schema").User> & import("../mongo/schemas/user/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    })[]>;
    currentUser(req: RequestWithUser): Promise<import("../interfaces/userGet").UserGet>;
    changeName(dto: UserUpdateName, req: RequestWithUser): Promise<import("mongoose").Document<unknown, {}, import("../mongo/schemas/user/user.schema").User> & import("../mongo/schemas/user/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    changeEmail(dto: UserUpdateEmailDto, req: RequestWithUser): Promise<import("mongoose").Document<unknown, {}, import("../mongo/schemas/user/user.schema").User> & import("../mongo/schemas/user/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    verifyUser(verificationToken: string): Promise<import("mongoose").Document<unknown, {}, import("../mongo/schemas/user/user.schema").User> & import("../mongo/schemas/user/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    changePhone(dto: UserUpdatePhone, req: RequestWithUser): Promise<import("mongoose").Document<unknown, {}, import("../mongo/schemas/user/user.schema").User> & import("../mongo/schemas/user/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    changeRole(dto: UserUpdateRoleDto, req: RequestWithUser): Promise<import("mongoose").Document<unknown, {}, import("../mongo/schemas/user/user.schema").User> & import("../mongo/schemas/user/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    changePassword(dto: UserUpdatePassword, req: RequestWithUser): Promise<import("mongoose").Document<unknown, {}, import("../mongo/schemas/user/user.schema").User> & import("../mongo/schemas/user/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    changeAvatar(file: Express.Multer.File, req: RequestWithUser): Promise<{
        message: string;
    }>;
}

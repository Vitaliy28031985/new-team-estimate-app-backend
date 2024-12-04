import { AuthService } from './auth.service';
import { User } from 'src/mongo/schemas/user/user.schema';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { AuthCreateDto } from './auth-dto/auth.create.dto';
import { AuthLoginDto } from './auth-dto/auth.login.dto';
import { UserUpdateEmailDto } from 'src/user/dtos/user.update.email.dto';
import { VerifyCodeDto } from './auth-dto/verify.code.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: AuthCreateDto): Promise<User>;
    verifyUser(verificationToken: string): Promise<{
        token: string;
        refreshToken: string;
    }>;
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any): Promise<{
        user: {
            id: any;
            email: any;
            name: any;
        };
        token: string;
    }>;
    login(loginDto: AuthLoginDto): Promise<{
        token: string;
    }>;
    RefreshToken(req: RequestWithUser): Promise<{
        token: string;
        refreshToken: string;
    }>;
    logout(req: RequestWithUser): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    sendVerifyCode(dto: UserUpdateEmailDto): Promise<{
        message: string;
    }>;
    verifyCode(dto: VerifyCodeDto): Promise<{
        message: string;
    }>;
}

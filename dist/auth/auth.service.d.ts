import { Model } from 'mongoose';
import { EmailService } from '../email/email.service';
import { User } from 'src/mongo/schemas/user/user.schema';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { AuthCreateDto } from './auth-dto/auth.create.dto';
import { AuthLoginDto } from './auth-dto/auth.login.dto';
import { UserUpdateEmailDto } from 'src/user/dtos/user.update.email.dto';
import { VerifyCodeDto } from './auth-dto/verify.code.dto';
export declare class AuthService {
    private userModel;
    private readonly emailService;
    private readonly secretKey;
    constructor(userModel: Model<User>, emailService: EmailService);
    register(userDto: AuthCreateDto): Promise<User>;
    verifyEmail(verificationToken: string): Promise<{
        token: string;
        refreshToken: string;
    }>;
    validateOAuthLogin(googleId: string, email: string, displayName: string, photos: string): Promise<User>;
    loginWithGoogle(user: any): Promise<{
        user: {
            id: any;
            email: any;
            name: any;
        };
        token: string;
    }>;
    login(loginDto: AuthLoginDto): Promise<{
        token: string;
        refreshToken: string;
    }>;
    refreshToken(req: RequestWithUser): Promise<{
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
    generateRandomNumber(): number;
}

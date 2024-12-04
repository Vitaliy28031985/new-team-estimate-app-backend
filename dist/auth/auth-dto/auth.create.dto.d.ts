import { Allow } from 'src/mongo/schemas/user/allow.schema';
export declare class AuthCreateDto {
    name: string;
    email: string;
    phone: string;
    password: string;
    avatar?: string;
    role: string;
    projectIds: Allow[];
    token?: string;
    verify: boolean;
    verificationToken: string;
}

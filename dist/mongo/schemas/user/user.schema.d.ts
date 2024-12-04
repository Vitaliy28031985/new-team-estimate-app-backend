import { Document } from 'mongoose';
import { Allow } from './allow.schema';
export type UserDocument = User & Document;
export declare class User {
    name: string;
    googleId: string;
    email: string;
    phone: string;
    password: string;
    avatar?: string;
    role: string;
    projectIds: Allow[];
    token?: string;
    refreshToken?: string;
    verifyCode: string;
    verify: boolean;
    verificationToken: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;

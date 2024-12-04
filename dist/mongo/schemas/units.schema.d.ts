import { Document } from 'mongoose';
import { Types } from 'mongoose';
export type UnitDocument = Unit & Document;
export declare class Unit {
    title: string;
    owner: Types.ObjectId;
}
export declare const UnitSchema: import("mongoose").Schema<Unit, import("mongoose").Model<Unit, any, any, any, Document<unknown, any, Unit> & Unit & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Unit, Document<unknown, {}, import("mongoose").FlatRecord<Unit>> & import("mongoose").FlatRecord<Unit> & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}>;

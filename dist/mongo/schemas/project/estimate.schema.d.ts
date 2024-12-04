import { Document, Types } from 'mongoose';
import { Position } from './position.schema';
export type EstimateDocument = Estimate & Document;
export declare class Estimate {
    id: Types.ObjectId;
    title: string;
    positions: Position[];
    total: number;
}
export declare const EstimateSchema: import("mongoose").Schema<Estimate, import("mongoose").Model<Estimate, any, any, any, Document<unknown, any, Estimate> & Estimate & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Estimate, Document<unknown, {}, import("mongoose").FlatRecord<Estimate>> & import("mongoose").FlatRecord<Estimate> & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}>;

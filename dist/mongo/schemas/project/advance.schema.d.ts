import { Document } from 'mongoose';
export type AdvanceDocument = Advance & Document;
export declare class Advance {
    id: string;
    comment: string;
    date: string;
    sum: number;
}
export declare const AdvanceSchema: import("mongoose").Schema<Advance, import("mongoose").Model<Advance, any, any, any, Document<unknown, any, Advance> & Advance & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Advance, Document<unknown, {}, import("mongoose").FlatRecord<Advance>> & import("mongoose").FlatRecord<Advance> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;

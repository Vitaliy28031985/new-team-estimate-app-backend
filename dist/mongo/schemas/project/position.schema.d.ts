import { Document } from 'mongoose';
export type PositionDocument = Position & Document;
export declare class Position {
    id: string;
    title: string;
    unit: string;
    number: number;
    price: number;
    result: number;
}
export declare const PositionSchema: import("mongoose").Schema<Position, import("mongoose").Model<Position, any, any, any, Document<unknown, any, Position> & Position & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Position, Document<unknown, {}, import("mongoose").FlatRecord<Position>> & import("mongoose").FlatRecord<Position> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;

import { Document } from 'mongoose';
import { Types } from 'mongoose';
export type PriceDocument = Price & Document;
export declare class Price {
    id: Types.ObjectId;
    title: string;
    price: number;
    updateAllow: boolean;
    owner: Types.ObjectId;
}
export declare const PriceSchema: import("mongoose").Schema<Price, import("mongoose").Model<Price, any, any, any, Document<unknown, any, Price> & Price & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Price, Document<unknown, {}, import("mongoose").FlatRecord<Price>> & import("mongoose").FlatRecord<Price> & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}>;

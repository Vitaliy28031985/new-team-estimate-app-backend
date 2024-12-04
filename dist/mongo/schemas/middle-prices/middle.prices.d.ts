import { Document } from 'mongoose';
import { PriceList } from './prices.list';
export type MiddlePriceDocument = MiddlePrice & Document;
export declare class MiddlePrice {
    title: string;
    price: number;
    prices: PriceList[];
}
export declare const MiddlePriceSchema: import("mongoose").Schema<MiddlePrice, import("mongoose").Model<MiddlePrice, any, any, any, Document<unknown, any, MiddlePrice> & MiddlePrice & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MiddlePrice, Document<unknown, {}, import("mongoose").FlatRecord<MiddlePrice>> & import("mongoose").FlatRecord<MiddlePrice> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;

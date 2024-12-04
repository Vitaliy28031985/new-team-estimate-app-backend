import { Document } from 'mongoose';
import { Types } from 'mongoose';
export type PriceListDocument = PriceList & Document;
export declare class PriceList {
    id: Types.ObjectId;
    price: number;
    owner: Types.ObjectId;
}
export declare const PriceListSchema: import("mongoose").Schema<PriceList, import("mongoose").Model<PriceList, any, any, any, Document<unknown, any, PriceList> & PriceList & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PriceList, Document<unknown, {}, import("mongoose").FlatRecord<PriceList>> & import("mongoose").FlatRecord<PriceList> & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}>;

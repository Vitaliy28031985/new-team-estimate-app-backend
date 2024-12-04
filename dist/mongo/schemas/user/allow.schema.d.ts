import { Document } from 'mongoose';
export type AllowDocument = Allow & Document;
export declare class Allow {
    id: string;
    userId: string;
    allowLevel: string;
    lookAt: string;
    lookAtTotals: string;
}
export declare const AllowSchema: import("mongoose").Schema<Allow, import("mongoose").Model<Allow, any, any, any, Document<unknown, any, Allow> & Allow & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Allow, Document<unknown, {}, import("mongoose").FlatRecord<Allow>> & import("mongoose").FlatRecord<Allow> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;

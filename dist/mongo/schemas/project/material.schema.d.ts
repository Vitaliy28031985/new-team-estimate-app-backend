import { Document } from 'mongoose';
export type MaterialDocument = Material & Document;
export declare class Material {
    id: string;
    title: string;
    order: string;
    date: string;
    sum: number;
}
export declare const MaterialSchema: import("mongoose").Schema<Material, import("mongoose").Model<Material, any, any, any, Document<unknown, any, Material> & Material & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Material, Document<unknown, {}, import("mongoose").FlatRecord<Material>> & import("mongoose").FlatRecord<Material> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;

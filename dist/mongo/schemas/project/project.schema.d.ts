import { Document, Types } from 'mongoose';
import { Estimate } from './estimate.schema';
import { Material } from './material.schema';
import { Advance } from './advance.schema';
import { Price } from '../price.schema';
export type ProjectDocument = Project & Document;
export declare class Project {
    title: string;
    description: string;
    estimates: Estimate[];
    lowEstimates: Estimate[];
    materials: Material[];
    advances: Advance[];
    prices: Price[];
    lowPrices: Price[];
    discount: number;
    lowDiscount: number;
    discountPercentage: number;
    materialsTotal: number;
    advancesTotal: number;
    lowTotal: number;
    total: number;
    lowGeneral: number;
    general: number;
    allowList: Types.ObjectId;
    owner: Types.ObjectId;
}
export declare const ProjectSchema: import("mongoose").Schema<Project, import("mongoose").Model<Project, any, any, any, Document<unknown, any, Project> & Project & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Project, Document<unknown, {}, import("mongoose").FlatRecord<Project>> & import("mongoose").FlatRecord<Project> & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}>;

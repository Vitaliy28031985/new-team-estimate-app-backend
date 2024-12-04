import { Types } from 'mongoose';
export declare class PricesDto {
    id?: Types.ObjectId;
    owner?: Types.ObjectId;
    title: string;
    price: number;
    updateAllow?: boolean;
}

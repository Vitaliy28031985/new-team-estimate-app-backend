import { LowProjectPriceService } from './low.project.price.service';
import { PricesDto } from 'src/prices/price.dto';
import { Types } from 'mongoose';
export declare class LowProjectPriceController {
    private readonly lowProjectPriceService;
    constructor(lowProjectPriceService: LowProjectPriceService);
    create(dto: PricesDto, projectId: string): Promise<{
        id: Types.ObjectId;
        title: string;
        price: number;
        updateAllow: boolean;
    }>;
    update(dto: PricesDto, projectId: string, priceId: string): Promise<{
        message: string;
    }>;
    remove(projectId: string, priceId: string): Promise<{
        message: string;
    }>;
}

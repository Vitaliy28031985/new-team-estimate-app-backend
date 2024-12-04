import { PricesService } from './prices.service';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { PricesDto } from './price.dto';
import { Price } from 'src/mongo/schemas/price.schema';
export declare class PricesController {
    private readonly pricesService;
    constructor(pricesService: PricesService);
    getAll(req: RequestWithUser): Promise<Price[]>;
    create(priceDto: PricesDto, req: RequestWithUser): Promise<Price>;
    update(priceId: string, priceDto: PricesDto, req: RequestWithUser): Promise<Price>;
    remove(priceId: string, req: RequestWithUser): Promise<Price>;
}

import { UnitsService } from './units.service';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { UnitsDto } from './units.dto';
import { Unit } from 'src/mongo/schemas/units.schema';
export declare class UnitsController {
    private readonly unitsService;
    constructor(unitsService: UnitsService);
    getAll(req: RequestWithUser): Promise<Unit[]>;
    create(unitsDto: UnitsDto, req: RequestWithUser): Promise<Unit>;
    remove(priceId: string, req: RequestWithUser): Promise<Unit>;
}

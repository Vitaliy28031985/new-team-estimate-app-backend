import { Model, Types } from 'mongoose';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { Unit } from 'src/mongo/schemas/units.schema';
import { UnitsDto } from './units.dto';
export declare class UnitsService {
    private unitModel;
    constructor(unitModel: Model<Unit>);
    findAll(req: RequestWithUser): Promise<Unit[]>;
    create(req: RequestWithUser, unitsDto: UnitsDto): Promise<Unit>;
    remove(unitId: Types.ObjectId, req: RequestWithUser): Promise<Unit>;
}

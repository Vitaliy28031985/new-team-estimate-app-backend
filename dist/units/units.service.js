"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const errors_1 = require("../common/errors");
const units_schema_1 = require("../mongo/schemas/units.schema");
const units_dto_1 = require("./units.dto");
let UnitsService = class UnitsService {
    constructor(unitModel) {
        this.unitModel = unitModel;
    }
    async findAll(req) {
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        return this.unitModel.find({ owner: typedUser._id });
    }
    async create(req, unitsDto) {
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        const newUnit = this.unitModel.create({ ...unitsDto, owner: typedUser });
        return newUnit;
    }
    async remove(unitId, req) {
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        const unitsList = await this.unitModel.find({
            owner: typedUser._id,
        });
        if (unitsList.length === 0) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PRICE);
        }
        const targetPrice = unitsList.some(({ _id }) => _id.toString() === String(unitId));
        if (!targetPrice) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PRICE);
        }
        return this.unitModel.findOneAndDelete({
            owner: typedUser._id,
            _id: unitId,
        });
    }
};
exports.UnitsService = UnitsService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UnitsService.prototype, "findAll", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, units_dto_1.UnitsDto]),
    __metadata("design:returntype", Promise)
], UnitsService.prototype, "create", null);
__decorate([
    __param(0, (0, common_1.Param)('unitId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], UnitsService.prototype, "remove", null);
exports.UnitsService = UnitsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(units_schema_1.Unit.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UnitsService);
//# sourceMappingURL=units.service.js.map
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
exports.UnitsController = void 0;
const common_1 = require("@nestjs/common");
const units_service_1 = require("./units.service");
const roleGuard_1 = require("../guards/roleGuard");
const units_dto_1 = require("./units.dto");
const mongoose_1 = require("mongoose");
const helpers_1 = require("../projects/positions/helpers");
const errors_1 = require("../common/errors");
let UnitsController = class UnitsController {
    constructor(unitsService) {
        this.unitsService = unitsService;
    }
    async getAll(req) {
        return this.unitsService.findAll(req);
    }
    async create(unitsDto, req) {
        return this.unitsService.create(req, unitsDto);
    }
    async remove(priceId, req) {
        if (!helpers_1.Helpers.checkId(priceId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectId = new mongoose_1.Types.ObjectId(priceId);
        return this.unitsService.remove(objectId, req);
    }
};
exports.UnitsController = UnitsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roleGuard_1.RoleGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(roleGuard_1.RoleGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [units_dto_1.UnitsDto, Object]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':unitId'),
    __param(0, (0, common_1.Param)('unitId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "remove", null);
exports.UnitsController = UnitsController = __decorate([
    (0, common_1.Controller)('units'),
    __metadata("design:paramtypes", [units_service_1.UnitsService])
], UnitsController);
//# sourceMappingURL=units.controller.js.map
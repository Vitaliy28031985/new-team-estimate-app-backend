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
exports.LowProjectPriceController = void 0;
const common_1 = require("@nestjs/common");
const low_project_price_service_1 = require("./low.project.price.service");
const price_dto_1 = require("../../prices/price.dto");
const mongoose_1 = require("mongoose");
const helpers_1 = require("../positions/helpers");
const errors_1 = require("../../common/errors");
const project_low_guard_1 = require("../project/project.low.guard");
let LowProjectPriceController = class LowProjectPriceController {
    constructor(lowProjectPriceService) {
        this.lowProjectPriceService = lowProjectPriceService;
    }
    async create(dto, projectId) {
        if (!helpers_1.Helpers.checkId(projectId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectId = new mongoose_1.Types.ObjectId(projectId);
        return await this.lowProjectPriceService.createPrice(dto, objectId);
    }
    async update(dto, projectId, priceId) {
        if (!helpers_1.Helpers.checkId(projectId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectId = new mongoose_1.Types.ObjectId(projectId);
        return await this.lowProjectPriceService.updatePrice(dto, objectId, priceId);
    }
    async remove(projectId, priceId) {
        if (!helpers_1.Helpers.checkId(projectId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectId = new mongoose_1.Types.ObjectId(projectId);
        return await this.lowProjectPriceService.removePrice(objectId, priceId);
    }
};
exports.LowProjectPriceController = LowProjectPriceController;
__decorate([
    (0, common_1.Post)('/:projectId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(project_low_guard_1.ProjectLowGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [price_dto_1.PricesDto, String]),
    __metadata("design:returntype", Promise)
], LowProjectPriceController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('/:projectId/:priceId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(project_low_guard_1.ProjectLowGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Param)('priceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [price_dto_1.PricesDto, String, String]),
    __metadata("design:returntype", Promise)
], LowProjectPriceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:projectId/:priceId'),
    (0, common_1.UseGuards)(project_low_guard_1.ProjectLowGuard),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('priceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LowProjectPriceController.prototype, "remove", null);
exports.LowProjectPriceController = LowProjectPriceController = __decorate([
    (0, common_1.Controller)('low/project/price'),
    __metadata("design:paramtypes", [low_project_price_service_1.LowProjectPriceService])
], LowProjectPriceController);
//# sourceMappingURL=low.project.price.controller.js.map
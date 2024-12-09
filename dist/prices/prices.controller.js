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
exports.PricesController = void 0;
const common_1 = require("@nestjs/common");
const prices_service_1 = require("./prices.service");
const price_dto_1 = require("./price.dto");
const mongoose_1 = require("mongoose");
const roleGuard_1 = require("../guards/roleGuard");
const helpers_1 = require("../projects/positions/helpers");
const errors_1 = require("../common/errors");
let PricesController = class PricesController {
    constructor(pricesService) {
        this.pricesService = pricesService;
    }
    async getAllMiddlePrice() {
        return this.pricesService.getAll();
    }
    async getAll(req) {
        return this.pricesService.findAll(req);
    }
    async create(priceDto, req) {
        return this.pricesService.create(priceDto, req);
    }
    async update(priceId, priceDto, req) {
        if (!helpers_1.Helpers.checkId(priceId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectId = new mongoose_1.Types.ObjectId(priceId);
        return this.pricesService.update(objectId, priceDto, req);
    }
    async remove(priceId, req) {
        if (!helpers_1.Helpers.checkId(priceId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectId = new mongoose_1.Types.ObjectId(priceId);
        return this.pricesService.remove(objectId, req);
    }
};
exports.PricesController = PricesController;
__decorate([
    (0, common_1.Get)('middle'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PricesController.prototype, "getAllMiddlePrice", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roleGuard_1.RoleGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PricesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(roleGuard_1.RoleGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [price_dto_1.PricesDto, Object]),
    __metadata("design:returntype", Promise)
], PricesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':priceId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(roleGuard_1.RoleGuard),
    __param(0, (0, common_1.Param)('priceId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, price_dto_1.PricesDto, Object]),
    __metadata("design:returntype", Promise)
], PricesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':priceId'),
    __param(0, (0, common_1.Param)('priceId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PricesController.prototype, "remove", null);
exports.PricesController = PricesController = __decorate([
    (0, common_1.Controller)('prices'),
    __metadata("design:paramtypes", [prices_service_1.PricesService])
], PricesController);
//# sourceMappingURL=prices.controller.js.map
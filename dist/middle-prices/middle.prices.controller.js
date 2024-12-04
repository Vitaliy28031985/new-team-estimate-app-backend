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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlePricesController = void 0;
const common_1 = require("@nestjs/common");
const middle_prices_service_1 = require("./middle.prices.service");
let MiddlePricesController = class MiddlePricesController {
    constructor(middlePricesService) {
        this.middlePricesService = middlePricesService;
    }
    async getAll() {
        return await this.middlePricesService.getAll();
    }
};
exports.MiddlePricesController = MiddlePricesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MiddlePricesController.prototype, "getAll", null);
exports.MiddlePricesController = MiddlePricesController = __decorate([
    (0, common_1.Controller)('middle/prices'),
    __metadata("design:paramtypes", [middle_prices_service_1.MiddlePricesService])
], MiddlePricesController);
//# sourceMappingURL=middle.prices.controller.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlePricesModule = void 0;
const common_1 = require("@nestjs/common");
const middle_prices_service_1 = require("./middle.prices.service");
const middle_prices_controller_1 = require("./middle.prices.controller");
const mongoose_1 = require("@nestjs/mongoose");
const middle_prices_1 = require("../mongo/schemas/middle-prices/middle.prices");
let MiddlePricesModule = class MiddlePricesModule {
};
exports.MiddlePricesModule = MiddlePricesModule;
exports.MiddlePricesModule = MiddlePricesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: middle_prices_1.MiddlePrice.name, schema: middle_prices_1.MiddlePriceSchema },
            ]),
        ],
        controllers: [middle_prices_controller_1.MiddlePricesController],
        providers: [middle_prices_service_1.MiddlePricesService],
        exports: [middle_prices_service_1.MiddlePricesService],
    })
], MiddlePricesModule);
//# sourceMappingURL=middle.prices.module.js.map
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
exports.MiddlePriceSchema = exports.MiddlePrice = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const prices_list_1 = require("./prices.list");
let MiddlePrice = class MiddlePrice {
};
exports.MiddlePrice = MiddlePrice;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MiddlePrice.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], MiddlePrice.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [prices_list_1.PriceListSchema], default: [] }),
    __metadata("design:type", Array)
], MiddlePrice.prototype, "prices", void 0);
exports.MiddlePrice = MiddlePrice = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, timestamps: true })
], MiddlePrice);
exports.MiddlePriceSchema = mongoose_1.SchemaFactory.createForClass(MiddlePrice);
//# sourceMappingURL=middle.prices.js.map
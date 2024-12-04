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
exports.EstimateSchema = exports.Estimate = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const position_schema_1 = require("./position.schema");
let Estimate = class Estimate {
};
exports.Estimate = Estimate;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Estimate.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Estimate.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [position_schema_1.PositionSchema], default: [] }),
    __metadata("design:type", Array)
], Estimate.prototype, "positions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Estimate.prototype, "total", void 0);
exports.Estimate = Estimate = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, timestamps: true })
], Estimate);
exports.EstimateSchema = mongoose_1.SchemaFactory.createForClass(Estimate);
//# sourceMappingURL=estimate.schema.js.map
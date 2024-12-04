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
exports.ProjectSchema = exports.Project = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const estimate_schema_1 = require("./estimate.schema");
const material_schema_1 = require("./material.schema");
const advance_schema_1 = require("./advance.schema");
const price_schema_1 = require("../price.schema");
let Project = class Project {
};
exports.Project = Project;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Project.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [estimate_schema_1.EstimateSchema], default: [] }),
    __metadata("design:type", Array)
], Project.prototype, "estimates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [estimate_schema_1.EstimateSchema], default: [] }),
    __metadata("design:type", Array)
], Project.prototype, "lowEstimates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [material_schema_1.MaterialSchema], default: [] }),
    __metadata("design:type", Array)
], Project.prototype, "materials", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [advance_schema_1.AdvanceSchema], default: [] }),
    __metadata("design:type", Array)
], Project.prototype, "advances", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [price_schema_1.PriceSchema], default: [] }),
    __metadata("design:type", Array)
], Project.prototype, "prices", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [price_schema_1.PriceSchema], default: [] }),
    __metadata("design:type", Array)
], Project.prototype, "lowPrices", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "discount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "lowDiscount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "discountPercentage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "materialsTotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "advancesTotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "lowTotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "total", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "lowGeneral", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "general", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true, default: [] }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Project.prototype, "allowList", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Project.prototype, "owner", void 0);
exports.Project = Project = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, timestamps: true })
], Project);
exports.ProjectSchema = mongoose_1.SchemaFactory.createForClass(Project);
//# sourceMappingURL=project.schema.js.map
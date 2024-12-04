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
exports.EstimatesController = void 0;
const common_1 = require("@nestjs/common");
const estimates_service_1 = require("./estimates.service");
const mongoose_1 = require("mongoose");
const estimate_dto_1 = require("./estimate.dto");
const helpers_1 = require("../positions/helpers");
const errors_1 = require("../../common/errors");
const project_large_guard_1 = require("../project/project.large.guard");
let EstimatesController = class EstimatesController {
    constructor(estimatesService) {
        this.estimatesService = estimatesService;
    }
    async create(dto, projectId) {
        if (!helpers_1.Helpers.checkId(projectId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectId = new mongoose_1.Types.ObjectId(projectId);
        return await this.estimatesService.createEstimate(dto, objectId);
    }
    async update(dto, projectId, estimateId) {
        if (!helpers_1.Helpers.checkId(projectId) || !helpers_1.Helpers.checkId(estimateId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectProjectId = new mongoose_1.Types.ObjectId(projectId);
        const objectEstimatedId = new mongoose_1.Types.ObjectId(estimateId);
        return await this.estimatesService.updateEstimated(dto, objectProjectId, objectEstimatedId);
    }
    async remove(projectId, estimateId) {
        if (!helpers_1.Helpers.checkId(projectId) || !helpers_1.Helpers.checkId(estimateId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectProjectId = new mongoose_1.Types.ObjectId(projectId);
        const objectEstimatedId = new mongoose_1.Types.ObjectId(estimateId);
        return await this.estimatesService.removeEstimate(objectProjectId, objectEstimatedId);
    }
};
exports.EstimatesController = EstimatesController;
__decorate([
    (0, common_1.Post)(':projectId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(project_large_guard_1.ProjectLargeGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [estimate_dto_1.EstimateDto, String]),
    __metadata("design:returntype", Promise)
], EstimatesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('/:projectId/:estimateId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(project_large_guard_1.ProjectLargeGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Param)('estimateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [estimate_dto_1.EstimateDto, String, String]),
    __metadata("design:returntype", Promise)
], EstimatesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:projectId/:estimateId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(project_large_guard_1.ProjectLargeGuard),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('estimateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EstimatesController.prototype, "remove", null);
exports.EstimatesController = EstimatesController = __decorate([
    (0, common_1.Controller)('estimates'),
    __metadata("design:paramtypes", [estimates_service_1.EstimatesService])
], EstimatesController);
//# sourceMappingURL=estimates.controller.js.map
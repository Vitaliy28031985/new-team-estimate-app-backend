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
exports.LowPositionController = void 0;
const common_1 = require("@nestjs/common");
const low_position_service_1 = require("./low.position.service");
const position_create_dto_1 = require("../../positions/position-dto/position.create.dto");
const mongoose_1 = require("mongoose");
const helpers_1 = require("../../positions/helpers");
const errors_1 = require("../../../common/errors");
const project_low_guard_1 = require("../../project/project.low.guard");
let LowPositionController = class LowPositionController {
    constructor(lowPositionService) {
        this.lowPositionService = lowPositionService;
    }
    async create(dto, projectId, estimateId) {
        if (!helpers_1.Helpers.checkId(projectId) || !helpers_1.Helpers.checkId(estimateId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectProjectId = new mongoose_1.Types.ObjectId(projectId);
        const objectEstimatedId = new mongoose_1.Types.ObjectId(estimateId);
        return await this.lowPositionService.createPosition(dto, objectProjectId, objectEstimatedId);
    }
    async update(dto, projectId, estimateId, positionId) {
        if (!helpers_1.Helpers.checkId(projectId) || !helpers_1.Helpers.checkId(estimateId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectProjectId = new mongoose_1.Types.ObjectId(projectId);
        const objectEstimatedId = new mongoose_1.Types.ObjectId(estimateId);
        await this.lowPositionService.updatePosition(dto, objectProjectId, objectEstimatedId, positionId);
    }
    async remove(projectId, estimateId, positionId) {
        if (!helpers_1.Helpers.checkId(projectId) || !helpers_1.Helpers.checkId(estimateId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectProjectId = new mongoose_1.Types.ObjectId(projectId);
        const objectEstimatedId = new mongoose_1.Types.ObjectId(estimateId);
        return await this.lowPositionService.removePosition(objectProjectId, objectEstimatedId, positionId);
    }
};
exports.LowPositionController = LowPositionController;
__decorate([
    (0, common_1.Post)('/:projectId/:estimateId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(project_low_guard_1.ProjectLowGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Param)('estimateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [position_create_dto_1.CreatePositionDto, String, String]),
    __metadata("design:returntype", Promise)
], LowPositionController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':projectId/:estimateId/:positionId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(project_low_guard_1.ProjectLowGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Param)('estimateId')),
    __param(3, (0, common_1.Param)('positionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [position_create_dto_1.CreatePositionDto, String, String, String]),
    __metadata("design:returntype", Promise)
], LowPositionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':projectId/:estimateId/:positionId'),
    (0, common_1.UseGuards)(project_low_guard_1.ProjectLowGuard),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('estimateId')),
    __param(2, (0, common_1.Param)('positionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], LowPositionController.prototype, "remove", null);
exports.LowPositionController = LowPositionController = __decorate([
    (0, common_1.Controller)('low/position'),
    __metadata("design:paramtypes", [low_position_service_1.LowPositionService])
], LowPositionController);
//# sourceMappingURL=low.position.controller.js.map
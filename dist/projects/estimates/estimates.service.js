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
exports.EstimatesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const project_schema_1 = require("../../mongo/schemas/project/project.schema");
const positions_service_1 = require("../positions/positions.service");
const errors_1 = require("../../common/errors");
const message_1 = require("../../common/message");
const estimate_dto_1 = require("./estimate.dto");
let EstimatesService = class EstimatesService {
    constructor(projectModel, positionsService) {
        this.projectModel = projectModel;
        this.positionsService = positionsService;
    }
    async createEstimate(dto, projectId) {
        const newEstimateId = !dto.id ? new mongoose_2.Types.ObjectId() : dto.id;
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const estimates = project.estimates;
        if (estimates.length !== 0) {
            const isEmptyEstimate = estimates.some(({ title }) => title === dto.title);
            if (isEmptyEstimate) {
                throw new common_1.ConflictException(errors_1.ErrorsApp.EXIST_ESTIMATE(dto.title));
            }
        }
        return await this.projectModel.findByIdAndUpdate(projectId, { $push: { estimates: { ...dto, id: newEstimateId } } }, { new: true });
    }
    async updateEstimated(dto, projectId, estimateId) {
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const estimateList = project.estimates;
        for (let i = 0; i < estimateList.length; i++) {
            if (estimateList[i].id.toString() === estimateId.toString()) {
                estimateList[i].title = dto.title;
            }
        }
        return await this.projectModel.findByIdAndUpdate(projectId, { $set: { estimates: estimateList } }, { new: true });
    }
    async removeEstimate(projectId, estimateId) {
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const estimateList = project.estimates;
        const isEmptyEstimate = estimateList.some(({ id }) => id.toString() === estimateId.toString());
        if (!isEmptyEstimate) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_ESTIMATE);
        }
        const newEstimatesList = estimateList.filter(({ id }) => id.toString() !== estimateId.toString());
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { estimates: newEstimatesList } }, { new: true });
        await this.positionsService.getTotal(projectId);
        await this.positionsService.getResults(projectId);
        return { message: message_1.MessageApp.DELETE_ESTIMATE() };
    }
};
exports.EstimatesService = EstimatesService;
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [estimate_dto_1.EstimateDto, mongoose_2.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], EstimatesService.prototype, "createEstimate", null);
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Param)('estimateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [estimate_dto_1.EstimateDto, mongoose_2.Types.ObjectId, mongoose_2.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], EstimatesService.prototype, "updateEstimated", null);
__decorate([
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('estimateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId, mongoose_2.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], EstimatesService.prototype, "removeEstimate", null);
exports.EstimatesService = EstimatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        positions_service_1.PositionsService])
], EstimatesService);
//# sourceMappingURL=estimates.service.js.map
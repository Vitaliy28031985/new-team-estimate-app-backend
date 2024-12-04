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
exports.LowEstimateService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const errors_1 = require("../../../common/errors");
const message_1 = require("../../../common/message");
const project_schema_1 = require("../../../mongo/schemas/project/project.schema");
const estimate_dto_1 = require("../../estimates/estimate.dto");
const estimates_service_1 = require("../../estimates/estimates.service");
const setting_project_service_1 = require("../../setting-project/setting.project.service");
let LowEstimateService = class LowEstimateService {
    constructor(projectModel, estimatesService, settingService) {
        this.projectModel = projectModel;
        this.estimatesService = estimatesService;
        this.settingService = settingService;
    }
    async createLowEstimate(dto, projectId) {
        const newEstimateId = new mongoose_2.Types.ObjectId();
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        if (project.lowEstimates.length === 0) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_LOW_ESTIMATES);
        }
        const estimateList = project.lowEstimates;
        const exitEstimate = estimateList.some(({ title }) => title.toLocaleLowerCase() === dto.title.toLocaleLowerCase());
        if (exitEstimate) {
            throw new common_1.ConflictException(errors_1.ErrorsApp.EXIST_ESTIMATE(dto.title));
        }
        const newLowEstimate = await this.projectModel.findByIdAndUpdate(projectId, { $push: { lowEstimates: { ...dto, id: newEstimateId } } }, { new: true });
        await this.estimatesService.createEstimate({ ...dto, id: newEstimateId }, projectId);
        return newLowEstimate;
    }
    async updateEstimated(dto, projectId, estimateId) {
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const estimateLowList = project.lowEstimates;
        if (project.lowEstimates.length === 0) {
            const isEmptyLowEstimate = estimateLowList.some(({ id }) => id.toString() === estimateId.toString());
            if (!isEmptyLowEstimate) {
                throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_LOW_ESTIMATES);
            }
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_LOW_ESTIMATES);
        }
        for (let i = 0; i < estimateLowList.length; i++) {
            if (estimateLowList[i].id.toString() === estimateId.toString()) {
                estimateLowList[i].title = dto.title;
            }
        }
        const newEstimateLowList = await this.projectModel.findByIdAndUpdate(projectId, { $set: { lowEstimates: estimateLowList } }, { new: true });
        await this.estimatesService.updateEstimated(dto, projectId, estimateId);
        return newEstimateLowList;
    }
    async removeEstimateLow(projectId, estimateId) {
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const estimateLowList = project.lowEstimates;
        const isEmptyEstimate = estimateLowList.some(({ id }) => id.toString() === estimateId.toString());
        if (!isEmptyEstimate) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_ESTIMATE);
        }
        const newEstimatesLowList = estimateLowList.filter(({ id }) => id.toString() !== estimateId.toString());
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { lowEstimates: newEstimatesLowList } }, { new: true });
        await this.estimatesService.removeEstimate(projectId, estimateId);
        await this.settingService.getTotal(projectId);
        await this.settingService.getResults(projectId);
        return { message: message_1.MessageApp.DELETE_ESTIMATE() };
    }
};
exports.LowEstimateService = LowEstimateService;
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [estimate_dto_1.EstimateDto, mongoose_2.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], LowEstimateService.prototype, "createLowEstimate", null);
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Param)('estimateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [estimate_dto_1.EstimateDto, mongoose_2.Types.ObjectId, mongoose_2.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], LowEstimateService.prototype, "updateEstimated", null);
__decorate([
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('estimateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId, mongoose_2.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], LowEstimateService.prototype, "removeEstimateLow", null);
exports.LowEstimateService = LowEstimateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        estimates_service_1.EstimatesService,
        setting_project_service_1.SettingProjectService])
], LowEstimateService);
//# sourceMappingURL=low.estimate.service.js.map
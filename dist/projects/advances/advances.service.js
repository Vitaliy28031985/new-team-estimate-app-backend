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
exports.AdvancesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const project_schema_1 = require("../../mongo/schemas/project/project.schema");
const positions_service_1 = require("../positions/positions.service");
const advance_dto_1 = require("./advance.dto");
const errors_1 = require("../../common/errors");
const helpers_1 = require("../positions/helpers");
const message_1 = require("../../common/message");
const setting_project_service_1 = require("../setting-project/setting.project.service");
let AdvancesService = class AdvancesService {
    constructor(projectModel, positionsService, settingService) {
        this.projectModel = projectModel;
        this.positionsService = positionsService;
        this.settingService = settingService;
    }
    async createAdvances(dto, projectId) {
        const newId = (0, uuid_1.v4)();
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const newAdvance = project.advances;
        newAdvance.push({
            id: newId,
            comment: dto.comment,
            date: dto.date,
            sum: dto.sum,
        });
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { advances: newAdvance } }, { new: true });
        await this.getTotal(projectId);
        await this.positionsService.getResults(projectId);
        await this.settingService.getResults(projectId);
        return { message: message_1.MessageApp.ADD_ADVANCE(dto.comment) };
    }
    async updateAdvance(dto, projectId, advancesId) {
        const newAdvanceList = [];
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const advanceArr = project.advances;
        const isEmptyAdvance = advanceArr.some(({ id }) => id === advancesId);
        if (!isEmptyAdvance) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_ADVANCE);
        }
        for (let i = 0; i < advanceArr.length; i++) {
            if (advanceArr[i].id === advancesId) {
                newAdvanceList.push({
                    id: advanceArr[i].id,
                    ...dto,
                });
            }
            else {
                newAdvanceList.push({
                    id: advanceArr[i].id,
                    comment: advanceArr[i].comment,
                    date: advanceArr[i].date,
                    sum: advanceArr[i].sum,
                });
            }
        }
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { advances: newAdvanceList } }, { new: true });
        await this.getTotal(projectId);
        await this.positionsService.getResults(projectId);
        await this.settingService.getResults(projectId);
        return { message: message_1.MessageApp.UPDATE_ADVANCE(dto.comment) };
    }
    async removeAdvance(projectId, advancesId) {
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const advanceArr = project.advances;
        const isEmptyAdvance = advanceArr.some(({ id }) => id === advancesId);
        if (!isEmptyAdvance) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_ADVANCE);
        }
        const newAdvancesList = project.advances.filter(({ id }) => id !== advancesId);
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { advances: newAdvancesList } }, { new: true });
        await this.getTotal(projectId);
        await this.positionsService.getResults(projectId);
        await this.settingService.getResults(projectId);
        return { message: message_1.MessageApp.DELETE_ADVANCE };
    }
    async getTotal(projectId) {
        const advancesArray = await this.projectModel.findById(projectId);
        const sumAdvance = helpers_1.Helpers.sumMaterials(advancesArray.advances);
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { advancesTotal: sumAdvance } }, { new: true });
        return;
    }
};
exports.AdvancesService = AdvancesService;
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [advance_dto_1.AdvanceDto, mongoose_2.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], AdvancesService.prototype, "createAdvances", null);
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Param)('advancesId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [advance_dto_1.AdvanceDto, mongoose_2.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], AdvancesService.prototype, "updateAdvance", null);
__decorate([
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('advancesId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], AdvancesService.prototype, "removeAdvance", null);
exports.AdvancesService = AdvancesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        positions_service_1.PositionsService,
        setting_project_service_1.SettingProjectService])
], AdvancesService);
//# sourceMappingURL=advances.service.js.map
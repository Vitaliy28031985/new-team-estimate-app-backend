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
exports.PositionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const project_schema_1 = require("../../mongo/schemas/project/project.schema");
const position_create_dto_1 = require("./position-dto/position.create.dto");
const helpers_1 = require("./helpers");
const errors_1 = require("../../common/errors");
const message_1 = require("../../common/message");
let PositionsService = class PositionsService {
    constructor(projectModel) {
        this.projectModel = projectModel;
    }
    async createPosition(dto, projectId, estimateId) {
        const newId = !dto.id ? (0, uuid_1.v4)() : dto.id;
        let totalPositions = null;
        const positionNew = {
            id: newId,
            title: dto.title,
            unit: dto.unit,
            number: dto.number,
            price: dto.price,
            result: helpers_1.Helpers.multiplication(dto.number, dto.price),
        };
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const estimateList = project.estimates;
        const isEmptyEstimate = estimateList.some(({ id }) => id.toString() === estimateId.toString());
        if (!isEmptyEstimate) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_ESTIMATE);
        }
        for (let i = 0; i < estimateList.length; i++) {
            if (estimateList[i].id.toString() === estimateId.toString()) {
                const positionsList = estimateList[i].positions;
                const existPosition = positionsList.some(({ title }) => title.toLowerCase() === dto.title.toLocaleLowerCase());
                if (existPosition) {
                    throw new common_1.ConflictException(errors_1.ErrorsApp.EXIST_POSITION(dto.title));
                }
                estimateList[i].positions.push(positionNew);
                totalPositions = helpers_1.Helpers.sumData(estimateList[i]);
                estimateList[i].total = totalPositions;
            }
        }
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { estimates: estimateList } }, { new: true });
        await this.getTotal(projectId);
        await this.getResults(projectId);
        return { message: message_1.MessageApp.CREATE_POSITION(dto.title) };
    }
    async updatePosition(dto, projectId, estimateId, positionId) {
        let totalPositions = null;
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const estimateList = project.estimates;
        const isEmptyEstimate = estimateList.some(({ id }) => id.toString() === estimateId.toString());
        if (!isEmptyEstimate) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_ESTIMATE);
        }
        for (let i = 0; i < estimateList.length; i++) {
            if (estimateList[i].id.toString() === estimateId.toString()) {
                const positionsList = estimateList[i].positions;
                const isEmptyPosition = positionsList.some(({ id }) => id === positionId);
                if (!isEmptyPosition) {
                    throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_POSITION);
                }
                for (let i = 0; i < positionsList.length; i++) {
                    if (positionsList[i].id === positionId) {
                        positionsList[i].title = dto.title;
                        positionsList[i].unit = dto.unit;
                        positionsList[i].number = dto.number;
                        positionsList[i].price = dto.price;
                        positionsList[i].result = helpers_1.Helpers.multiplication(dto.number, dto.price);
                    }
                }
                totalPositions = helpers_1.Helpers.sumData(estimateList[i]);
                estimateList[i].total = totalPositions;
            }
        }
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { estimates: estimateList } }, { new: true });
        await this.getTotal(projectId);
        await this.getResults(projectId);
        return { message: message_1.MessageApp.UPDATE_POSITION(dto.title) };
    }
    async removePosition(projectId, estimateId, positionId) {
        let totalPositions = null;
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const estimateList = project.estimates;
        const isEmptyEstimate = estimateList.some(({ id }) => id.toString() === estimateId.toString());
        if (!isEmptyEstimate) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_ESTIMATE);
        }
        for (let i = 0; i < estimateList.length; i++) {
            if (estimateList[i].id.toString() === estimateId.toString()) {
                const positionsList = estimateList[i].positions;
                const isEmptyPosition = positionsList.some(({ id }) => id === positionId);
                if (!isEmptyPosition) {
                    throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_POSITION);
                }
                const newPositionsList = estimateList[i].positions.filter(({ id }) => id !== positionId);
                estimateList[i].positions = newPositionsList;
                totalPositions = helpers_1.Helpers.sumData(estimateList[i]);
                estimateList[i].total = totalPositions;
            }
        }
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { estimates: estimateList } }, { new: true });
        await this.getTotal(projectId);
        await this.getResults(projectId);
        return { message: message_1.MessageApp.DELETE_POSITION };
    }
    async getTotal(projectId) {
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        const totalEstimates = helpers_1.Helpers.sumEstimate(project);
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { total: totalEstimates } }, { new: true });
    }
    async getResults(projectId) {
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        const NewDiscount = project.total * project.discountPercentage;
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { discount: NewDiscount } }, { new: true });
        const generalArray = await this.projectModel.findById(projectId);
        const generalResult = helpers_1.Helpers.getGeneral(generalArray.total, generalArray.materialsTotal, generalArray.advancesTotal, NewDiscount);
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { general: generalResult } }, { new: true });
    }
};
exports.PositionsService = PositionsService;
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Param)('estimateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [position_create_dto_1.CreatePositionDto, mongoose_2.Types.ObjectId, mongoose_2.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PositionsService.prototype, "createPosition", null);
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Param)('estimateId')),
    __param(3, (0, common_1.Param)('positionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [position_create_dto_1.CreatePositionDto, mongoose_2.Types.ObjectId, mongoose_2.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], PositionsService.prototype, "updatePosition", null);
__decorate([
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('estimateId')),
    __param(2, (0, common_1.Param)('positionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId, mongoose_2.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], PositionsService.prototype, "removePosition", null);
exports.PositionsService = PositionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PositionsService);
//# sourceMappingURL=positions.service.js.map
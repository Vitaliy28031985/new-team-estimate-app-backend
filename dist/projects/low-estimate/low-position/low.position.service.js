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
exports.LowPositionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const errors_1 = require("../../../common/errors");
const project_schema_1 = require("../../../mongo/schemas/project/project.schema");
const estimates_service_1 = require("../../estimates/estimates.service");
const position_create_dto_1 = require("../../positions/position-dto/position.create.dto");
const positions_service_1 = require("../../positions/positions.service");
const setting_project_service_1 = require("../../setting-project/setting.project.service");
const helpers_1 = require("../../positions/helpers");
const message_1 = require("../../../common/message");
let LowPositionService = class LowPositionService {
    constructor(projectModel, estimatesService, positionsService, settingService) {
        this.projectModel = projectModel;
        this.estimatesService = estimatesService;
        this.positionsService = positionsService;
        this.settingService = settingService;
    }
    async createPosition(dto, projectId, estimateId) {
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        if (project.lowEstimates.length === 0) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_LOW_ESTIMATES);
        }
        let allow = true;
        let allowPriceBig = null;
        const prices = project.prices;
        if (prices.length !== 0) {
            for (let i = 0; i < prices.length; i++) {
                if (prices[i].title.toLocaleLowerCase() === dto.title.toLocaleLowerCase()) {
                    allowPriceBig = prices[i].price;
                }
            }
        }
        const lowPrices = project.lowPrices;
        if (lowPrices.length !== 0) {
            for (let i = 0; i < lowPrices.length; i++) {
                if (lowPrices[i].title.toLocaleLowerCase() ===
                    dto.title.toLocaleLowerCase()) {
                    allow = lowPrices[i].updateAllow;
                }
            }
        }
        const newId = (0, uuid_1.v4)();
        let totalPositions = null;
        const positionNew = {
            id: newId,
            title: dto.title,
            unit: dto.unit,
            number: dto.number,
            price: dto.price,
            result: helpers_1.Helpers.multiplication(dto.number, dto.price),
        };
        const stateDiscountConvert = project.lowDiscount * dto.price;
        const newPrice = dto.price + stateDiscountConvert;
        const bigPosition = {
            id: newId,
            title: dto.title,
            unit: dto.unit,
            number: dto.number,
            price: allow ? newPrice : allowPriceBig,
        };
        const estimateList = project.lowEstimates;
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
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { lowEstimates: estimateList } }, { new: true });
        await this.settingService.getTotal(projectId);
        await this.settingService.getResults(projectId);
        await this.positionsService.createPosition(bigPosition, projectId, estimateId);
        return { message: message_1.MessageApp.CREATE_POSITION(dto.title) };
    }
    async updatePosition(dto, projectId, estimateId, positionId) {
        let totalPositions = null;
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        if (project.lowEstimates.length === 0) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_LOW_ESTIMATES);
        }
        let allow = true;
        let allowPrice = null;
        let allowTitle = '';
        let allowPriceBig = null;
        const prices = project.prices;
        if (prices.length !== 0) {
            for (let i = 0; i < prices.length; i++) {
                if (prices[i].title.toLocaleLowerCase() === dto.title.toLocaleLowerCase()) {
                    allowPriceBig = prices[i].price;
                }
            }
        }
        const lowPrices = project.lowPrices;
        if (lowPrices.length !== 0) {
            for (let i = 0; i < lowPrices.length; i++) {
                if (lowPrices[i].title.toLocaleLowerCase() ===
                    dto.title.toLocaleLowerCase()) {
                    allow = lowPrices[i].updateAllow;
                    allowPrice = lowPrices[i].price;
                    allowTitle = lowPrices[i].title;
                }
            }
        }
        const stateDiscountConvert = project.lowDiscount * dto.price;
        const newPrice = dto.price + stateDiscountConvert;
        const positionNew = {
            title: allow ? dto.title : allowTitle,
            unit: dto.unit,
            number: dto.number,
            price: allow ? dto.price : allowPrice,
            result: helpers_1.Helpers.multiplication(dto.number, allow ? dto.price : allowPrice),
        };
        const bigPosition = {
            title: allow ? dto.title : allowTitle,
            unit: dto.unit,
            number: dto.number,
            price: allow ? newPrice : allowPriceBig,
        };
        const estimateList = project.lowEstimates;
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
                        positionsList[i].title = positionNew.title;
                        positionsList[i].unit = positionNew.unit;
                        positionsList[i].number = positionNew.number;
                        positionsList[i].price = positionNew.price;
                        positionsList[i].result = positionNew.result;
                    }
                }
                totalPositions = helpers_1.Helpers.sumData(estimateList[i]);
                estimateList[i].total = totalPositions;
            }
        }
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { lowEstimates: estimateList } }, { new: true });
        await this.settingService.getTotal(projectId);
        await this.settingService.getResults(projectId);
        await this.positionsService.updatePosition(bigPosition, projectId, estimateId, positionId);
        return { message: message_1.MessageApp.UPDATE_POSITION(dto.title) };
    }
    async removePosition(projectId, estimateId, positionId) {
        let totalPositions = null;
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        if (project.lowEstimates.length === 0) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_LOW_ESTIMATES);
        }
        const estimateList = project.lowEstimates;
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
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { lowEstimates: estimateList } }, { new: true });
        await this.settingService.getTotal(projectId);
        await this.settingService.getResults(projectId);
        await this.positionsService.removePosition(projectId, estimateId, positionId);
        return { message: message_1.MessageApp.DELETE_POSITION };
    }
};
exports.LowPositionService = LowPositionService;
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Param)('estimateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [position_create_dto_1.CreatePositionDto, mongoose_2.Types.ObjectId, mongoose_2.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], LowPositionService.prototype, "createPosition", null);
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Param)('estimateId')),
    __param(3, (0, common_1.Param)('positionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [position_create_dto_1.CreatePositionDto, mongoose_2.Types.ObjectId, mongoose_2.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], LowPositionService.prototype, "updatePosition", null);
__decorate([
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('estimateId')),
    __param(2, (0, common_1.Param)('positionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId, mongoose_2.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], LowPositionService.prototype, "removePosition", null);
exports.LowPositionService = LowPositionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        estimates_service_1.EstimatesService,
        positions_service_1.PositionsService,
        setting_project_service_1.SettingProjectService])
], LowPositionService);
//# sourceMappingURL=low.position.service.js.map
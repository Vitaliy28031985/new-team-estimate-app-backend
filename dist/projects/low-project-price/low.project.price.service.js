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
exports.LowProjectPriceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const project_schema_1 = require("../../mongo/schemas/project/project.schema");
const project_prices_service_1 = require("../project-prices/project.prices.service");
const price_dto_1 = require("../../prices/price.dto");
const errors_1 = require("../../common/errors");
const low_position_service_1 = require("../low-estimate/low-position/low.position.service");
const helpers_1 = require("../positions/helpers");
const message_1 = require("../../common/message");
let LowProjectPriceService = class LowProjectPriceService {
    constructor(projectModel, projectPricesService, lowPositionService) {
        this.projectModel = projectModel;
        this.projectPricesService = projectPricesService;
        this.lowPositionService = lowPositionService;
    }
    async createPrice(dto, projectId) {
        const newPriceId = new mongoose_2.Types.ObjectId();
        const newDto = {
            id: newPriceId,
            title: dto.title,
            price: dto.price,
            updateAllow: true,
        };
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const projectPrices = project.lowPrices;
        const isEmptyPrice = projectPrices.some(({ title }) => title.toLocaleLowerCase() === dto.title.toLocaleLowerCase());
        if (isEmptyPrice) {
            throw new common_1.ConflictException(errors_1.ErrorsApp.EXIST_PRICE(dto.title));
        }
        const newPrice = [...projectPrices, newDto];
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { lowPrices: newPrice } }, { new: true });
        const discount = project.lowDiscount;
        const bigDto = {
            id: newPriceId,
            title: dto.title,
            price: dto.price + dto.price * discount,
            updateAllow: true,
        };
        await this.projectPricesService.createPrice(bigDto, projectId);
        return newDto;
    }
    async updatePrice(dto, projectId, priceId) {
        let currentTitle = '';
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const projectPrices = project.lowPrices;
        if (projectPrices.length !== 0) {
            for (let i = 0; i < projectPrices.length; i++) {
                if (projectPrices[i].id.toString() === priceId.toString()) {
                    const allow = projectPrices[i].updateAllow;
                    if (allow === false) {
                        throw new common_1.ForbiddenException(errors_1.ErrorsApp.FORBIDDEN_PRICE_UPDATE);
                    }
                    projectPrices[i].title = dto.title;
                    projectPrices[i].price = dto.price;
                    currentTitle = projectPrices[i].title;
                }
            }
        }
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { lowPrices: projectPrices } }, { new: true });
        const discount = project.lowDiscount;
        const bigDto = {
            title: dto.title,
            price: dto.price + dto.price * discount,
            updateAllow: true,
        };
        await this.projectPricesService.updatePrice(bigDto, projectId, priceId);
        const estimateList = project.lowEstimates;
        if (estimateList.length !== 0) {
            for (let i = 0; i < estimateList.length; i++) {
                const positionList = estimateList[i].positions;
                for (let i = 0; i < positionList.length; i++) {
                    if (positionList[i].title === currentTitle) {
                        positionList[i].id = positionList[i].id;
                        positionList[i].title = dto.title;
                        positionList[i].unit = positionList[i].unit;
                        positionList[i].number = positionList[i].number;
                        positionList[i].price = dto.price;
                        positionList[i].result = helpers_1.Helpers.multiplication(positionList[i].number, dto.price);
                    }
                }
                estimateList[i].total = helpers_1.Helpers.sumData(estimateList[i]);
            }
        }
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { lowEstimates: estimateList } }, { new: true });
        await this.lowPositionService.settingService.getTotal(projectId);
        await this.lowPositionService.settingService.getResults(projectId);
        await this.projectPricesService.updatePrice(bigDto, projectId, priceId);
        return { message: message_1.MessageApp.UPDATE_PROJECT_PRICE(dto.title) };
    }
    async removePrice(projectId, priceId) {
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const projectPrices = project.lowPrices;
        const allow = projectPrices.filter(({ id }) => id.toString() === priceId.toString());
        if (allow[0].updateAllow === false) {
            throw new common_1.ForbiddenException(errors_1.ErrorsApp.FORBIDDEN_PRICE_UPDATE);
        }
        const newProjectPriceList = projectPrices.filter(({ id }) => id.toString() !== priceId.toString());
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { lowPrices: newProjectPriceList } }, { new: true });
        await this.projectPricesService.removePrice(projectId, priceId);
        return { message: message_1.MessageApp.DELETE_PRICE };
    }
};
exports.LowProjectPriceService = LowProjectPriceService;
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [price_dto_1.PricesDto, mongoose_2.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], LowProjectPriceService.prototype, "createPrice", null);
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Param)('priceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [price_dto_1.PricesDto, mongoose_2.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], LowProjectPriceService.prototype, "updatePrice", null);
__decorate([
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('priceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], LowProjectPriceService.prototype, "removePrice", null);
exports.LowProjectPriceService = LowProjectPriceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        project_prices_service_1.ProjectPricesService,
        low_position_service_1.LowPositionService])
], LowProjectPriceService);
//# sourceMappingURL=low.project.price.service.js.map
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
exports.SettingProjectService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const project_schema_1 = require("../../mongo/schemas/project/project.schema");
const user_schema_1 = require("../../mongo/schemas/user/user.schema");
const add_allow_dto_1 = require("./dto/add.allow.dto");
const errors_1 = require("../../common/errors");
const message_1 = require("../../common/message");
const delete_dto_1 = require("./dto/delete.dto");
const positions_service_1 = require("../positions/positions.service");
const helpers_1 = require("../positions/helpers");
const price_schema_1 = require("../../mongo/schemas/price.schema");
const discount_dto_1 = require("./dto/discount.dto");
let SettingProjectService = class SettingProjectService {
    constructor(projectModel, userModel, positionsService, priceModel) {
        this.projectModel = projectModel;
        this.userModel = userModel;
        this.positionsService = positionsService;
        this.priceModel = priceModel;
    }
    async addAllowProject(allowDto, projectId, req) {
        const { email, allowLevel, lookAt, lookAtTotals } = allowDto;
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        const users = await this.userModel.find();
        const project = await this.projectModel.findById({ owner: typedUser._id, _id: projectId }, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const currentUser = users.filter((user) => user.email === email);
        if (currentUser.length === 0) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_USER(email));
        }
        if (project.owner.toString() !== typedUser._id.toString()) {
            throw new common_1.ForbiddenException(errors_1.ErrorsApp.ERROR_FORBIDDEN);
        }
        const userId = currentUser[0]._id;
        const userAllowList = currentUser[0].projectIds;
        const isEmptyProject = userAllowList.filter((user) => user.id.toString() === projectId.toString());
        if (isEmptyProject.length !== 0) {
            throw new common_1.ForbiddenException(errors_1.ErrorsApp.EXISTS_ALLOW(email));
        }
        const allowItem = {
            id: projectId.toString(),
            userId: userId.toString(),
            allowLevel,
            lookAt,
            lookAtTotals,
        };
        userAllowList.push(allowItem);
        const projectAllowList = project.allowList;
        if (!Array.isArray(projectAllowList)) {
            throw new Error('allowList не є масивом');
        }
        projectAllowList.push(userId.toString());
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { allowList: projectAllowList } }, { new: true });
        await this.userModel.findByIdAndUpdate(userId, { $set: { projectIds: userAllowList } }, { new: true });
        return {
            message: message_1.MessageApp.ADD_ALLOW(email),
            projectId,
            userId: userId.toString(),
        };
    }
    async updateProjectAllow(allowDto, projectId, req) {
        const { email, allowLevel, lookAt, lookAtTotals } = allowDto;
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        const users = await this.userModel.find();
        const project = await this.projectModel.findById({ owner: typedUser._id, _id: projectId }, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const currentUser = users.filter((user) => user.email === email);
        if (currentUser.length === 0) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_USER(email));
        }
        const userId = currentUser[0]._id;
        if (project.owner.toString() !== typedUser._id.toString()) {
            throw new common_1.ForbiddenException(errors_1.ErrorsApp.ERROR_FORBIDDEN);
        }
        const currentProject = currentUser[0].projectIds.filter(({ id }) => id.toString() === projectId.toString());
        if (currentProject.length === 0) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.EMPTY_ALLOW(email));
        }
        const newProjectIds = currentUser[0].projectIds;
        for (let i = 0; i < newProjectIds.length; i++) {
            if (newProjectIds[i].id.toString() === projectId.toString()) {
                newProjectIds[i].allowLevel = allowLevel;
                newProjectIds[i].lookAt = lookAt;
                newProjectIds[i].lookAtTotals = lookAtTotals;
            }
        }
        await this.userModel.findByIdAndUpdate(userId, { $set: { projectIds: newProjectIds } }, { new: true });
        return {
            message: message_1.MessageApp.UPDATE_ALLOW(email),
            projectId,
            userId: userId.toString(),
        };
    }
    async deleteAllowProject(allowDto, projectId, req) {
        const { email } = allowDto;
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        const users = await this.userModel.find();
        const project = await this.projectModel.findById({ owner: typedUser._id, _id: projectId }, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const currentUser = users.filter((user) => user.email === email);
        if (currentUser.length === 0) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_USER(email));
        }
        const userId = currentUser[0]._id;
        if (project.owner.toString() !== typedUser._id.toString()) {
            throw new common_1.ForbiddenException(errors_1.ErrorsApp.ERROR_FORBIDDEN);
        }
        const userAllowList = currentUser[0].projectIds;
        const ProjectList = project.allowList;
        const isEmptyAllowList = userAllowList.filter((user) => user.id.toString() === projectId.toString());
        if (!Array.isArray(ProjectList)) {
            throw new Error('allowList не є масивом');
        }
        const isEmptyProjectList = ProjectList.filter((item) => item.toString() === userId.toString());
        if (isEmptyAllowList.length === 0 || isEmptyProjectList.length === 0) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.EMPTY_ALLOW(email));
        }
        const newUserAllowList = userAllowList.filter((user) => user.id.toString() !== projectId.toString());
        const newProjectList = ProjectList.filter((item) => item.toString() !== userId.toString());
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { allowList: newProjectList } }, { new: true });
        await this.userModel.findByIdAndUpdate(userId, { $set: { projectIds: newUserAllowList } }, { new: true });
        return {
            message: message_1.MessageApp.DELETE_ALLOW(email),
            projectId,
            userId: userId.toString(),
        };
    }
    async addDiscount(dto, projectId) {
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        if (typeof dto.discount !== 'number' || !dto.discount) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_DISCOUNT);
        }
        const discountConvert = dto.discount >= 1 ? dto.discount / 100 : dto.discount;
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { discountPercentage: discountConvert } }, { new: true });
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { discount: project.total * discountConvert } }, { new: true });
        await this.positionsService.getResults(projectId);
        return { message: message_1.MessageApp.ADD_DISCOUNT(dto.discount) };
    }
    async addLowEstimates(dto, projectId, req) {
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        if (typeof dto.discount !== 'number' || !dto.discount) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_DISCOUNT);
        }
        const discountConvert = dto.discount >= 1 ? dto.discount / 100 : dto.discount;
        const estimateList = project.estimates;
        for (let i = 0; i < estimateList.length; i++) {
            const positionsList = estimateList[i].positions;
            for (let i = 0; i < positionsList.length; i++) {
                const currentDiscount = positionsList[i].price * discountConvert;
                const newResult = helpers_1.Helpers.multiplication(positionsList[i].number, positionsList[i].price - currentDiscount);
                positionsList[i].price = positionsList[i].price - currentDiscount;
                positionsList[i].result = newResult;
            }
            const newTotalEstimates = helpers_1.Helpers.sumData(estimateList[i]);
            estimateList[i].total = newTotalEstimates;
        }
        const lowPrices = await this.priceModel.find({ owner: typedUser._id });
        for (let i = 0; i < lowPrices.length; i++) {
            lowPrices[i].price =
                lowPrices[i].price - lowPrices[i].price * discountConvert;
        }
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { lowEstimates: estimateList } }, { new: true });
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { lowPrices: lowPrices } }, { new: true });
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { lowDiscount: discountConvert } }, { new: true });
        await this.getTotal(projectId);
        await this.getResults(projectId);
        return { message: message_1.MessageApp.ADD_LOW_PROJECT(dto.discount) };
    }
    async getTotal(projectId) {
        const projectListForTotal = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        const projectTotal = helpers_1.Helpers.sumLowEstimates(projectListForTotal);
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { lowTotal: projectTotal } }, { new: true });
        return;
    }
    async getResults(projectId) {
        const updateListLowGeneral = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        const getLowGeneral = updateListLowGeneral.lowTotal +
            updateListLowGeneral.materialsTotal -
            updateListLowGeneral.advancesTotal;
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { lowGeneral: getLowGeneral } }, { new: true });
        return;
    }
};
exports.SettingProjectService = SettingProjectService;
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_allow_dto_1.AddAllowDto, mongoose_2.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], SettingProjectService.prototype, "addAllowProject", null);
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_allow_dto_1.AddAllowDto, mongoose_2.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], SettingProjectService.prototype, "updateProjectAllow", null);
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_dto_1.DeleteAllowDto, mongoose_2.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], SettingProjectService.prototype, "deleteAllowProject", null);
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discount_dto_1.DiscountDto, mongoose_2.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], SettingProjectService.prototype, "addDiscount", null);
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discount_dto_1.DiscountDto, mongoose_2.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], SettingProjectService.prototype, "addLowEstimates", null);
exports.SettingProjectService = SettingProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(3, (0, mongoose_1.InjectModel)(price_schema_1.Price.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        positions_service_1.PositionsService,
        mongoose_2.Model])
], SettingProjectService);
//# sourceMappingURL=setting.project.service.js.map
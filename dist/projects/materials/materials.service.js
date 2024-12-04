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
exports.MaterialsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const project_schema_1 = require("../../mongo/schemas/project/project.schema");
const positions_service_1 = require("../positions/positions.service");
const material_dto_1 = require("./material.dto");
const errors_1 = require("../../common/errors");
const helpers_1 = require("../positions/helpers");
const message_1 = require("../../common/message");
const setting_project_service_1 = require("../setting-project/setting.project.service");
let MaterialsService = class MaterialsService {
    constructor(projectModel, positionsService, settingService) {
        this.projectModel = projectModel;
        this.positionsService = positionsService;
        this.settingService = settingService;
    }
    async createMaterial(dto, projectId) {
        const newId = (0, uuid_1.v4)();
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const materialList = project.materials;
        const isEmptyMaterial = materialList.some(({ order }) => order === dto.order);
        if (isEmptyMaterial) {
            throw new common_1.ConflictException(errors_1.ErrorsApp.EXIST_MATERIAL(dto.order));
        }
        materialList.push({
            id: newId,
            title: dto.title,
            order: dto.order,
            date: dto.date,
            sum: dto.sum,
        });
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { materials: materialList } }, { new: true });
        await this.getTotal(projectId);
        await this.positionsService.getResults(projectId);
        await this.settingService.getResults(projectId);
        return { message: message_1.MessageApp.CREATE_MATERIALS(dto.title) };
    }
    async updateMaterial(dto, projectId, materialsId) {
        const newMaterialsList = [];
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const materialList = project.materials;
        const isEmptyMaterial = materialList.some(({ id }) => id === materialsId);
        if (!isEmptyMaterial) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_MATERIAL);
        }
        for (let i = 0; i < materialList.length; i++) {
            if (materialList[i].id === materialsId) {
                newMaterialsList.push({
                    id: materialList[i].id,
                    ...dto,
                });
            }
            else {
                newMaterialsList.push({
                    id: materialList[i].id,
                    title: materialList[i].title,
                    order: materialList[i].order,
                    date: materialList[i].date,
                    sum: materialList[i].sum,
                });
            }
        }
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { materials: newMaterialsList } }, { new: true });
        await this.getTotal(projectId);
        await this.positionsService.getResults(projectId);
        await this.settingService.getResults(projectId);
        return { message: message_1.MessageApp.UPDATE_MATERIAL(dto.title) };
    }
    async remove(projectId, materialsId) {
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const materialList = project.materials;
        const isEmptyMaterial = materialList.some(({ id }) => id === materialsId);
        if (!isEmptyMaterial) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_MATERIAL);
        }
        const newMaterialsList = project.materials.filter(({ id }) => id !== materialsId);
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { materials: newMaterialsList } }, { new: true });
        await this.getTotal(projectId);
        await this.positionsService.getResults(projectId);
        await this.settingService.getResults(projectId);
        return { message: message_1.MessageApp.DELETE_MATERIAL };
    }
    async getTotal(projectId) {
        const materialsArray = await this.projectModel.findById(projectId);
        const sumMaterial = helpers_1.Helpers.sumMaterials(materialsArray.materials);
        await this.projectModel.findByIdAndUpdate(projectId, { $set: { materialsTotal: sumMaterial } }, { new: true });
        return;
    }
};
exports.MaterialsService = MaterialsService;
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [material_dto_1.MaterialDto, mongoose_2.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], MaterialsService.prototype, "createMaterial", null);
__decorate([
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Param)('materialsId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [material_dto_1.MaterialDto, mongoose_2.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], MaterialsService.prototype, "updateMaterial", null);
__decorate([
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('materialsId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], MaterialsService.prototype, "remove", null);
exports.MaterialsService = MaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        positions_service_1.PositionsService,
        setting_project_service_1.SettingProjectService])
], MaterialsService);
//# sourceMappingURL=materials.service.js.map
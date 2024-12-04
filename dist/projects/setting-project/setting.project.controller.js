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
exports.SettingProjectController = void 0;
const common_1 = require("@nestjs/common");
const setting_project_service_1 = require("./setting.project.service");
const add_allow_dto_1 = require("./dto/add.allow.dto");
const mongoose_1 = require("mongoose");
const delete_dto_1 = require("./dto/delete.dto");
const discount_dto_1 = require("./dto/discount.dto");
const helpers_1 = require("../positions/helpers");
const errors_1 = require("../../common/errors");
const project_owner_guard_1 = require("../project/project.owner.guard");
let SettingProjectController = class SettingProjectController {
    constructor(settingProjectService) {
        this.settingProjectService = settingProjectService;
    }
    async addAllowProject(allowDto, projectId, req) {
        if (!helpers_1.Helpers.checkId(projectId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectId = new mongoose_1.Types.ObjectId(projectId);
        return await this.settingProjectService.addAllowProject(allowDto, objectId, req);
    }
    async updateAllowProject(allowDto, projectId, req) {
        if (!helpers_1.Helpers.checkId(projectId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectId = new mongoose_1.Types.ObjectId(projectId);
        return await this.settingProjectService.updateProjectAllow(allowDto, objectId, req);
    }
    async deleteAllowProject(allowDto, projectId, req) {
        if (!helpers_1.Helpers.checkId(projectId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectId = new mongoose_1.Types.ObjectId(projectId);
        return await this.settingProjectService.deleteAllowProject(allowDto, objectId, req);
    }
    async addDiscount(dto, projectId) {
        if (!helpers_1.Helpers.checkId(projectId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectId = new mongoose_1.Types.ObjectId(projectId);
        return await this.settingProjectService.addDiscount(dto, objectId);
    }
    async addLowEstimates(dto, projectId, req) {
        if (!helpers_1.Helpers.checkId(projectId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const objectId = new mongoose_1.Types.ObjectId(projectId);
        return await this.settingProjectService.addLowEstimates(dto, objectId, req);
    }
};
exports.SettingProjectController = SettingProjectController;
__decorate([
    (0, common_1.Patch)('/add/:projectId'),
    (0, common_1.UseGuards)(project_owner_guard_1.ProjectOwnerGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_allow_dto_1.AddAllowDto, String, Object]),
    __metadata("design:returntype", Promise)
], SettingProjectController.prototype, "addAllowProject", null);
__decorate([
    (0, common_1.Patch)('/update/:projectId'),
    (0, common_1.UseGuards)(project_owner_guard_1.ProjectOwnerGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_allow_dto_1.AddAllowDto, String, Object]),
    __metadata("design:returntype", Promise)
], SettingProjectController.prototype, "updateAllowProject", null);
__decorate([
    (0, common_1.Patch)('/delete/:projectId'),
    (0, common_1.UseGuards)(project_owner_guard_1.ProjectOwnerGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_dto_1.DeleteAllowDto, String, Object]),
    __metadata("design:returntype", Promise)
], SettingProjectController.prototype, "deleteAllowProject", null);
__decorate([
    (0, common_1.Post)('/discount/:projectId'),
    (0, common_1.UseGuards)(project_owner_guard_1.ProjectOwnerGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discount_dto_1.DiscountDto, String]),
    __metadata("design:returntype", Promise)
], SettingProjectController.prototype, "addDiscount", null);
__decorate([
    (0, common_1.Post)('/lowEstimates/:projectId'),
    (0, common_1.UseGuards)(project_owner_guard_1.ProjectOwnerGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discount_dto_1.DiscountDto, String, Object]),
    __metadata("design:returntype", Promise)
], SettingProjectController.prototype, "addLowEstimates", null);
exports.SettingProjectController = SettingProjectController = __decorate([
    (0, common_1.Controller)('setting/project'),
    __metadata("design:paramtypes", [setting_project_service_1.SettingProjectService])
], SettingProjectController);
//# sourceMappingURL=setting.project.controller.js.map
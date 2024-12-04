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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const project_schema_1 = require("../mongo/schemas/project/project.schema");
const create_project_dto_1 = require("./projects-dtos/create.project.dto");
const price_schema_1 = require("../mongo/schemas/price.schema");
const errors_1 = require("../common/errors");
const user_schema_1 = require("../mongo/schemas/user/user.schema");
let ProjectsService = class ProjectsService {
    constructor(projectModel, priceModel, userModel) {
        this.projectModel = projectModel;
        this.priceModel = priceModel;
        this.userModel = userModel;
    }
    async getAll(req, page = 1, limit = 1) {
        const projectsIdArr = [];
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        if (typedUser.role === 'admin') {
            const projects = await this.projectModel.find();
            projectsIdArr.push(projects);
        }
        else {
            for (let i = 0; i < user.projectIds.length; i++) {
                const currentId = user.projectIds[i].id;
                const allowProjects = await this.projectModel.find({ _id: currentId });
                projectsIdArr.push(allowProjects[0]);
            }
            const projectsOwns = await this.projectModel.find({
                owner: typedUser._id,
            });
            projectsOwns.map((item) => projectsIdArr.push(item));
        }
        const skipCurrent = (page - 1) * limit;
        const endElement = projectsIdArr.length < limit ? projectsIdArr.length : skipCurrent + limit;
        const selectKeyProjects = projectsIdArr.map(({ _id, title, description }) => ({
            _id,
            title,
            description,
        }));
        const projects = selectKeyProjects.slice(skipCurrent, endElement);
        const total = projects.length;
        return { projects, total };
    }
    async getById(projectId, req) {
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (!project) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        if (project.owner.toString() === typedUser._id.toString() ||
            typedUser.role === 'admin') {
            return await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        }
        const userProjectsArray = typedUser.projectIds;
        const isEmptyProjectId = userProjectsArray.some(({ id }) => id === projectId.toString());
        if (isEmptyProjectId) {
            const currentProjectId = userProjectsArray.filter(({ id }) => id === projectId.toString());
            if (currentProjectId[0].lookAt === 'small' &&
                currentProjectId[0].lookAtTotals === 'show') {
                return await {
                    _id: project._id,
                    title: project.title,
                    description: project.description,
                    materialsTotal: project.materialsTotal,
                    advancesTotal: project.advancesTotal,
                    materials: project.materials,
                    advances: project.advances,
                    lowPrices: project.lowPrices,
                    lowEstimates: project.lowEstimates,
                    lowTotal: project.lowTotal,
                    lowGeneral: project.lowGeneral,
                };
            }
            if (currentProjectId[0].lookAt === 'small' &&
                currentProjectId[0].lookAtTotals === 'notShow') {
                return await {
                    _id: project._id,
                    title: project.title,
                    description: project.description,
                    lowPrices: project.lowPrices,
                    lowEstimates: project.lowEstimates,
                    lowTotal: project.lowTotal,
                };
            }
            if (currentProjectId[0].lookAt === 'large' &&
                currentProjectId[0].lookAtTotals === 'show') {
                return await {
                    _id: project._id,
                    title: project.title,
                    description: project.description,
                    materials: project.materials,
                    advances: project.advances,
                    prices: project.prices,
                    estimates: project.estimates,
                    total: project.total,
                    materialsTotal: project.materialsTotal,
                    advancesTotal: project.advancesTotal,
                    general: project.general,
                    discount: project.discount,
                    discountPercentage: project.discountPercentage,
                };
            }
            if (currentProjectId[0].lookAt === 'large' &&
                currentProjectId[0].lookAtTotals === 'notShow') {
                return await {
                    _id: project._id,
                    title: project.title,
                    description: project.description,
                    prices: project.prices,
                    estimates: project.estimates,
                    total: project.total,
                };
            }
            if (currentProjectId[0].lookAt === 'all' &&
                currentProjectId[0].lookAtTotals === 'show') {
                return await {
                    _id: project._id,
                    title: project.title,
                    description: project.description,
                    materials: project.materials,
                    advances: project.advances,
                    prices: project.prices,
                    estimates: project.estimates,
                    lowEstimates: project.lowEstimates,
                    lowPrices: project.lowPrices,
                    lowTotal: project.lowTotal,
                    lowGeneral: project.lowGeneral,
                    total: project.total,
                    materialsTotal: project.materialsTotal,
                    advancesTotal: project.advancesTotal,
                    general: project.general,
                    discount: project.discount,
                    discountPercentage: project.discountPercentage,
                };
            }
            if (currentProjectId[0].lookAt === 'all' &&
                currentProjectId[0].lookAtTotals === 'notShow') {
                return await {
                    _id: project._id,
                    title: project.title,
                    description: project.description,
                    prices: project.prices,
                    estimates: project.estimates,
                    lowEstimates: project.lowEstimates,
                    lowPrices: project.lowPrices,
                    lowTotal: project.lowTotal,
                    total: project.total,
                };
            }
        }
    }
    async create(projectDto, req) {
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        const projects = await this.projectModel.find({ owner: typedUser._id });
        const isEmptyProject = projects.some(({ title }) => title === projectDto.title);
        if (isEmptyProject) {
            throw new common_1.ConflictException(errors_1.ErrorsApp.EXIST_PROJECT(projectDto.title));
        }
        const prices = await this.priceModel.find({ owner: typedUser._id });
        const newProject = await this.projectModel.create({
            ...projectDto,
            prices,
            owner: typedUser,
        });
        return newProject;
    }
    async update(projectId, projectDto, req) {
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        const projectsList = await this.projectModel.find();
        if (projectsList.length === 0) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const currentProject = projectsList.some(({ _id }) => _id.toString() === String(projectId));
        if (!currentProject) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        return await this.projectModel.findByIdAndUpdate({ owner: typedUser._id, _id: projectId }, projectDto, { new: true, fields: ['-createdAt', '-updatedAt'] });
    }
    async remove(projectId, req) {
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        const projectsList = await this.projectModel.find({
            owner: typedUser._id,
        });
        if (projectsList.length === 0) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        const currentProject = projectsList.some(({ _id }) => _id.toString() === String(projectId));
        if (!currentProject) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PROJECT);
        }
        this.deleteAlowUser(projectId);
        return await this.projectModel.findOneAndDelete({
            owner: typedUser._id,
            _id: projectId,
        });
    }
    async deleteAlowUser(projectId) {
        const users = await this.userModel.find();
        for (let i = 0; i < users.length; i++) {
            const newAlowList = users[i].projectIds.filter(({ id }) => id !== projectId.toString());
            await this.userModel.findByIdAndUpdate(users[i]._id, { $set: { projectIds: newAlowList } }, { new: true });
        }
    }
};
exports.ProjectsService = ProjectsService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ProjectsService.prototype, "getAll", null);
__decorate([
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], ProjectsService.prototype, "getById", null);
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsService.prototype, "create", null);
__decorate([
    __param(0, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId, create_project_dto_1.CreateProjectDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsService.prototype, "update", null);
__decorate([
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], ProjectsService.prototype, "remove", null);
__decorate([
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], ProjectsService.prototype, "deleteAlowUser", null);
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __param(1, (0, mongoose_1.InjectModel)(price_schema_1.Price.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map
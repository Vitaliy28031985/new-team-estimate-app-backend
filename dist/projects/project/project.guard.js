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
exports.ProjectGuard = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const project_schema_1 = require("../../mongo/schemas/project/project.schema");
const helpers_1 = require("../positions/helpers");
const errors_1 = require("../../common/errors");
let ProjectGuard = class ProjectGuard {
    constructor(projectModel) {
        this.projectModel = projectModel;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const projectId = request.params.projectId;
        if (!helpers_1.Helpers.checkId(projectId)) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.BED_ID);
        }
        const user = request.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            return false;
        }
        const typedUser = user;
        if (typedUser.role === 'customer') {
            return false;
        }
        const project = await this.projectModel.findById(projectId, '-createdAt -updatedAt');
        if (project.owner.toString() === typedUser._id.toString()) {
            return true;
        }
        const userProjectsArray = typedUser.projectIds;
        const isEmptyProjectId = userProjectsArray.some(({ id }) => id === projectId);
        if (!isEmptyProjectId) {
            return false;
        }
        const currentProjectId = userProjectsArray.filter(({ id }) => id === projectId);
        if (currentProjectId[0].allowLevel === 'read') {
            return false;
        }
        return true;
    }
};
exports.ProjectGuard = ProjectGuard;
exports.ProjectGuard = ProjectGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProjectGuard);
//# sourceMappingURL=project.guard.js.map
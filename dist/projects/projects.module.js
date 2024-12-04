"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsModule = void 0;
const common_1 = require("@nestjs/common");
const projects_service_1 = require("./projects.service");
const projects_controller_1 = require("./projects.controller");
const mongoose_1 = require("@nestjs/mongoose");
const project_schema_1 = require("../mongo/schemas/project/project.schema");
const project_guard_1 = require("./project/project.guard");
const project_delete_guard_1 = require("./project/project.delete.guard");
const price_schema_1 = require("../mongo/schemas/price.schema");
const user_schema_1 = require("../mongo/schemas/user/user.schema");
let ProjectsModule = class ProjectsModule {
};
exports.ProjectsModule = ProjectsModule;
exports.ProjectsModule = ProjectsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: project_schema_1.Project.name, schema: project_schema_1.ProjectSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: price_schema_1.Price.name, schema: price_schema_1.PriceSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
        ],
        controllers: [projects_controller_1.ProjectsController],
        providers: [projects_service_1.ProjectsService, project_guard_1.ProjectGuard, project_delete_guard_1.ProjectDeleteGuard],
    })
], ProjectsModule);
//# sourceMappingURL=projects.module.js.map
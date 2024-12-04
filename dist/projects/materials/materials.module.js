"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialsModule = void 0;
const common_1 = require("@nestjs/common");
const materials_service_1 = require("./materials.service");
const materials_controller_1 = require("./materials.controller");
const mongoose_1 = require("@nestjs/mongoose");
const project_schema_1 = require("../../mongo/schemas/project/project.schema");
const positions_service_1 = require("../positions/positions.service");
const user_schema_1 = require("../../mongo/schemas/user/user.schema");
const price_schema_1 = require("../../mongo/schemas/price.schema");
const setting_project_service_1 = require("../setting-project/setting.project.service");
let MaterialsModule = class MaterialsModule {
};
exports.MaterialsModule = MaterialsModule;
exports.MaterialsModule = MaterialsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: project_schema_1.Project.name, schema: project_schema_1.ProjectSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: price_schema_1.Price.name, schema: price_schema_1.PriceSchema }]),
        ],
        controllers: [materials_controller_1.MaterialsController],
        providers: [materials_service_1.MaterialsService, positions_service_1.PositionsService, setting_project_service_1.SettingProjectService],
    })
], MaterialsModule);
//# sourceMappingURL=materials.module.js.map
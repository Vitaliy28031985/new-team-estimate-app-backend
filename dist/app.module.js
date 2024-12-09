"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const projects_module_1 = require("./projects/projects.module");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const units_module_1 = require("./units/units.module");
const prices_module_1 = require("./prices/prices.module");
const email_module_1 = require("./email/email.module");
const user_schema_1 = require("./mongo/schemas/user/user.schema");
const setting_project_module_1 = require("./projects/setting-project/setting.project.module");
const estimates_module_1 = require("./projects/estimates/estimates.module");
const positions_module_1 = require("./projects/positions/positions.module");
const materials_module_1 = require("./projects/materials/materials.module");
const advances_module_1 = require("./projects/advances/advances.module");
const project_prices_module_1 = require("./projects/project-prices/project.prices.module");
const low_estimate_module_1 = require("./projects/low-estimate/low-estimate/low.estimate.module");
const low_position_module_1 = require("./projects/low-estimate/low-position/low.position.module");
const auth_refresh_middleware_1 = require("./middlewares/auth.refresh.middleware");
const reviews_module_1 = require("./reviews/reviews.module");
const low_project_price_module_1 = require("./projects/low-project-price/low.project.price.module");
const user_module_1 = require("./user/user.module");
(0, dotenv_1.config)();
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('auth/logout');
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('prices');
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('user');
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('projects');
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('setting/project');
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('estimates');
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('positions');
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('materials');
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('advances');
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('project/prices');
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('low/estimate');
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('low/position');
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('units');
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('low/project/price');
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('reviews/create');
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('reviews/:reviewId');
        consumer.apply(auth_refresh_middleware_1.AuthRefreshMiddleware).forRoutes('auth/refresh/current');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: process.env.NODE_ENV === 'production'
                    ? '.env.production'
                    : '.env.development',
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_DB_HOST),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            auth_module_1.AuthModule,
            projects_module_1.ProjectsModule,
            units_module_1.UnitsModule,
            prices_module_1.PricesModule,
            email_module_1.EmailModule,
            setting_project_module_1.SettingProjectModule,
            estimates_module_1.EstimatesModule,
            positions_module_1.PositionsModule,
            materials_module_1.MaterialsModule,
            advances_module_1.AdvancesModule,
            project_prices_module_1.ProjectPricesModule,
            low_estimate_module_1.LowEstimateModule,
            low_position_module_1.LowPositionModule,
            reviews_module_1.ReviewsModule,
            low_project_price_module_1.LowProjectPriceModule,
            user_module_1.UserModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
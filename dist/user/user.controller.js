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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_update_email_dto_1 = require("./dtos/user.update.email.dto");
const user_update_phone_dto_1 = require("./dtos/user.update.phone.dto");
const user_update_password_dto_1 = require("./dtos/user.update.password.dto");
const platform_express_1 = require("@nestjs/platform-express");
const errors_1 = require("../common/errors");
const user_update_role_dto_1 = require("./dtos/user.update.role.dto");
const user_update_name_dto_1 = require("./dtos/user.update.name.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }
    async currentUser(req) {
        return await this.userService.getCurrentUser(req);
    }
    async changeName(dto, req) {
        return await this.userService.changeName(dto, req);
    }
    async changeEmail(dto, req) {
        return await this.userService.changeEmail(dto, req);
    }
    async verifyUser(verificationToken) {
        return await this.userService.verifyEmail(verificationToken);
    }
    async changePhone(dto, req) {
        return await this.userService.changePhone(dto, req);
    }
    async changeRole(dto, req) {
        return await this.userService.changeRole(dto, req);
    }
    async changePassword(dto, req) {
        return await this.userService.changePassword(dto, req);
    }
    async changeAvatar(file, req) {
        if (!file) {
            throw new Error(errors_1.ErrorsApp.NOT_UPDATE_AVATAR);
        }
        return await this.userService.changeAvatar(file, req);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('current'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "currentUser", null);
__decorate([
    (0, common_1.Put)('name'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_name_dto_1.UserUpdateName, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeName", null);
__decorate([
    (0, common_1.Put)('email'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_email_dto_1.UserUpdateEmailDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeEmail", null);
__decorate([
    (0, common_1.Get)('/verify/:verificationToken'),
    __param(0, (0, common_1.Param)('verificationToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyUser", null);
__decorate([
    (0, common_1.Put)('phone'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_phone_dto_1.UserUpdatePhone, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePhone", null);
__decorate([
    (0, common_1.Put)('role'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_role_dto_1.UserUpdateRoleDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeRole", null);
__decorate([
    (0, common_1.Put)('password'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_password_dto_1.UserUpdatePassword, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Put)('avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: /^(image\/jpeg|image\/jpg|image\/png|image\/svg\+xml)$/,
    })
        .addMaxSizeValidator({
        maxSize: 10000000,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeAvatar", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map
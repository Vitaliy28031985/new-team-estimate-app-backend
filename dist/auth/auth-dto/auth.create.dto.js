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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const errors_1 = require("../../common/errors");
const keys_1 = require("../../common/keys");
class AuthCreateDto {
}
exports.AuthCreateDto = AuthCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_validator_1.IsString)({ message: errors_1.ErrorsApp.EMPTY_NAME }),
    __metadata("design:type", String)
], AuthCreateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_validator_1.IsEmail)({}, { message: errors_1.ErrorsApp.NOT_VALID_EMAIL }),
    __metadata("design:type", String)
], AuthCreateDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(keys_1.keysSchemasString.PHONE, {
        message: errors_1.ErrorsApp.NOT_VALID_PHONE,
    }),
    __metadata("design:type", String)
], AuthCreateDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Пароль має містити принаймні 6 символів та в його складі має бути принаймні одна літера та один спеціальний символ (*, #, & тощо)!',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(keys_1.keysSchemasString.PASSWORD, {
        message: errors_1.ErrorsApp.NOT_VALID_PASSWORD,
    }),
    __metadata("design:type", String)
], AuthCreateDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthCreateDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['executor', 'customer', 'admin'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthCreateDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AuthCreateDto.prototype, "projectIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthCreateDto.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AuthCreateDto.prototype, "verify", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthCreateDto.prototype, "verificationToken", void 0);
//# sourceMappingURL=auth.create.dto.js.map
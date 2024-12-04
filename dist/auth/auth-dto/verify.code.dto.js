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
exports.VerifyCodeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const errors_1 = require("../../common/errors");
const keys_1 = require("../../common/keys");
class VerifyCodeDto {
}
exports.VerifyCodeDto = VerifyCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_validator_1.IsEmail)({}, { message: errors_1.ErrorsApp.NOT_VALID_EMAIL }),
    __metadata("design:type", String)
], VerifyCodeDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Пароль має містити принаймні 6 символів та в його складі має бути принаймні одна літера та один спеціальний символ (*, #, & тощо)!',
    }),
    (0, class_validator_1.Matches)(keys_1.keysSchemasString.PASSWORD, {
        message: errors_1.ErrorsApp.NOT_VALID_PASSWORD,
    }),
    __metadata("design:type", String)
], VerifyCodeDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'code має бути числом' }),
    __metadata("design:type", Number)
], VerifyCodeDto.prototype, "code", void 0);
//# sourceMappingURL=verify.code.dto.js.map
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
exports.UserUpdatePhone = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const errors_1 = require("../../common/errors");
const keys_1 = require("../../common/keys");
class UserUpdatePhone {
}
exports.UserUpdatePhone = UserUpdatePhone;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(keys_1.keysSchemasString.PHONE, {
        message: errors_1.ErrorsApp.NOT_VALID_PHONE,
    }),
    __metadata("design:type", String)
], UserUpdatePhone.prototype, "phone", void 0);
//# sourceMappingURL=user.update.phone.dto.js.map
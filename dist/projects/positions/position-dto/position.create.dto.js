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
exports.CreatePositionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePositionDto {
}
exports.CreatePositionDto = CreatePositionDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePositionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePositionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePositionDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'number має бути числом' }),
    __metadata("design:type", Number)
], CreatePositionDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'price має бути числом' }),
    __metadata("design:type", Number)
], CreatePositionDto.prototype, "price", void 0);
//# sourceMappingURL=position.create.dto.js.map
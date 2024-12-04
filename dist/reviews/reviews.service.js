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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const reviews_schema_1 = require("../mongo/schemas/reviews.schema");
const review_dto_1 = require("./review.dto");
const errors_1 = require("../common/errors");
let ReviewsService = class ReviewsService {
    constructor(ReviewsModel) {
        this.ReviewsModel = ReviewsModel;
    }
    async getAll() {
        return await this.ReviewsModel.find();
    }
    async create(req, reviewDto) {
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        const newReview = await this.ReviewsModel.create({
            ...reviewDto,
            avatar: typedUser.avatar,
            owner: typedUser._id,
            name: typedUser.name,
        });
        return newReview;
    }
    async update(reviewId, reviewDto, req) {
        if (Object.keys(req.body).length === 0) {
            throw new common_1.BadRequestException(errors_1.ErrorsApp.EMPTY_BODY);
        }
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        const review = await this.ReviewsModel.findById(reviewId);
        if (!review) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_REVIEW);
        }
        if (review.owner.toString() !== typedUser._id.toString()) {
            throw new common_1.ForbiddenException("You don't have access to this action!");
        }
        return await this.ReviewsModel.findByIdAndUpdate({ owner: typedUser._id, _id: reviewId }, { ...reviewDto, avatar: typedUser.avatar }, { new: true, fields: ['-createdAt', '-updatedAt'] });
    }
    async deleteReview(reviewId, req) {
        const user = req.user;
        const review = await this.ReviewsModel.findById(reviewId);
        if (!review) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_REVIEW);
        }
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        if (review.owner.toString() !== typedUser._id.toString()) {
            throw new common_1.ForbiddenException("You don't have access to this action!");
        }
        return await this.ReviewsModel.findByIdAndDelete(reviewId);
    }
};
exports.ReviewsService = ReviewsService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, review_dto_1.ReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewsService.prototype, "create", null);
__decorate([
    __param(0, (0, common_1.Param)('reviewId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId, review_dto_1.ReviewDto, Object]),
    __metadata("design:returntype", Promise)
], ReviewsService.prototype, "update", null);
__decorate([
    __param(0, (0, common_1.Param)('reviewId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], ReviewsService.prototype, "deleteReview", null);
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(reviews_schema_1.Review.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map
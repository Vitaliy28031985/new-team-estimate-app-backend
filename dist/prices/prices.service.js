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
exports.PricesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const price_schema_1 = require("../mongo/schemas/price.schema");
const price_dto_1 = require("./price.dto");
const errors_1 = require("../common/errors");
const middle_prices_1 = require("../mongo/schemas/middle-prices/middle.prices");
const helpers_1 = require("../projects/positions/helpers");
let PricesService = class PricesService {
    constructor(priceModel, middlePriceModel) {
        this.priceModel = priceModel;
        this.middlePriceModel = middlePriceModel;
    }
    async findAll(req) {
        const user = req.user;
        if (!user || typeof user !== "object" || !("_id" in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        return this.priceModel.find({ owner: typedUser._id });
    }
    async create(priceDto, req) {
        const newPriceId = new mongoose_2.Types.ObjectId();
        const user = req.user;
        if (!user || typeof user !== "object" || !("_id" in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        if (typeof priceDto.price !== "number") {
            throw new Error("price isn`t number");
        }
        const prices = await this.priceModel.find({ owner: typedUser._id });
        const isExistPrice = prices.some(({ title }) => title.toLocaleLowerCase() === priceDto.title.toLocaleLowerCase());
        if (isExistPrice) {
            throw new common_1.ConflictException(errors_1.ErrorsApp.EXIST_PRICE(priceDto.title));
        }
        const newPrice = await this.priceModel.create({
            ...priceDto,
            id: newPriceId,
            owner: typedUser._id,
        });
        await this.addMiddlePrice({
            ...priceDto,
            id: newPriceId,
            owner: typedUser._id,
        });
        return newPrice;
    }
    async update(priceId, priceDto, req) {
        const user = req.user;
        if (!user || typeof user !== "object" || !("_id" in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        const pricesList = await this.priceModel.find({
            owner: typedUser._id,
        });
        if (pricesList.length === 0) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PRICE);
        }
        const targetPrice = pricesList.filter(({ id }) => id.toString() === String(priceId));
        if (targetPrice.length === 0) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PRICE);
        }
        await this.updateMiddlePrice({
            ...priceDto,
            id: priceId,
            owner: typedUser._id,
        });
        return await this.priceModel.findByIdAndUpdate({ owner: typedUser._id, _id: targetPrice[0]._id }, priceDto, { new: true, fields: ["-createdAt", "-updatedAt"] });
    }
    async remove(priceId, req) {
        const user = req.user;
        if (!user || typeof user !== "object" || !("_id" in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        const pricesList = await this.priceModel.find({
            owner: typedUser._id,
        });
        if (pricesList.length === 0) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PRICE);
        }
        const targetPrice = pricesList.filter(({ id }) => id.toString() === priceId.toString());
        if (targetPrice.length === 0) {
            throw new common_1.NotFoundException(errors_1.ErrorsApp.NOT_PRICE);
        }
        await this.removeMiddlePrice(priceId);
        return this.priceModel.findOneAndDelete({
            owner: typedUser._id,
            _id: targetPrice[0]._id,
        });
    }
    async getAll() {
        return await this.middlePriceModel.find();
    }
    async addMiddlePrice(dto) {
        const middlePrices = await this.middlePriceModel.find({
            title: dto.title,
        });
        if (middlePrices.length === 0) {
            await this.middlePriceModel.create({
                title: dto.title,
                price: dto.price,
                prices: [{ id: dto.id, price: dto.price, owner: dto.owner }],
            });
        }
        if (middlePrices.length !== 0) {
            await this.middlePriceModel.findByIdAndUpdate(middlePrices[0]._id, {
                $push: {
                    prices: { id: dto.id, price: dto.price, owner: dto.owner },
                },
            }, { new: true });
            const newMiddlePrices = await this.middlePriceModel.find({
                title: dto.title,
            });
            await this.middlePriceModel.findByIdAndUpdate(newMiddlePrices[0]._id, { $set: { price: helpers_1.Helpers.middlePrice(newMiddlePrices[0].prices) } }, { new: true });
        }
    }
    async updateMiddlePrice(dto) {
        const middlePrices = await this.middlePriceModel.find();
        if (middlePrices.length !== 0) {
            for (let i = 0; i < middlePrices.length; i++) {
                const prices = middlePrices[i].prices;
                for (let i = 0; i < prices.length; i++) {
                    if (prices[i].id.toString() === dto.id.toString()) {
                        prices[i].price = dto.price;
                    }
                }
                await this.middlePriceModel.findByIdAndUpdate(middlePrices[i]._id, { $set: { prices } }, { new: true });
            }
        }
        const newMiddlePrices = await this.middlePriceModel.find();
        if (newMiddlePrices.length !== 0) {
            for (let i = 0; i < newMiddlePrices.length; i++) {
                const prices = newMiddlePrices[i].prices;
                if (prices.length !== 0) {
                    await this.middlePriceModel.findByIdAndUpdate(newMiddlePrices[i]._id, { $set: { price: helpers_1.Helpers.middlePrice(prices) } }, { new: true });
                }
            }
        }
    }
    async removeMiddlePrice(priceId) {
        const middlePrices = await this.middlePriceModel.find();
        if (middlePrices.length !== 0) {
            for (let i = 0; i < middlePrices.length; i++) {
                const prices = middlePrices[i].prices.filter(({ id }) => id.toString() !== priceId.toString());
                await this.middlePriceModel.findByIdAndUpdate(middlePrices[i]._id, { $set: { prices } }, { new: true });
            }
        }
        const newMiddlePrices = await this.middlePriceModel.find();
        if (newMiddlePrices.length !== 0) {
            for (let i = 0; i < newMiddlePrices.length; i++) {
                const prices = newMiddlePrices[i].prices;
                if (prices.length === 0) {
                    await this.middlePriceModel.findByIdAndUpdate(newMiddlePrices[i]._id, { $set: { price: 0 } }, { new: true });
                }
                if (prices.length !== 0) {
                    await this.middlePriceModel.findByIdAndUpdate(newMiddlePrices[i]._id, { $set: { price: helpers_1.Helpers.middlePrice(prices) } }, { new: true });
                }
            }
        }
    }
};
exports.PricesService = PricesService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PricesService.prototype, "findAll", null);
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [price_dto_1.PricesDto, Object]),
    __metadata("design:returntype", Promise)
], PricesService.prototype, "create", null);
__decorate([
    __param(0, (0, common_1.Param)("priceId")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId, price_dto_1.PricesDto, Object]),
    __metadata("design:returntype", Promise)
], PricesService.prototype, "update", null);
__decorate([
    __param(0, (0, common_1.Param)("priceId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], PricesService.prototype, "remove", null);
__decorate([
    __param(0, (0, common_1.Param)("priceId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PricesService.prototype, "removeMiddlePrice", null);
exports.PricesService = PricesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(price_schema_1.Price.name)),
    __param(1, (0, mongoose_1.InjectModel)(middle_prices_1.MiddlePrice.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PricesService);
//# sourceMappingURL=prices.service.js.map
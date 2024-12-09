import {
  ConflictException,
  Injectable,
  NotFoundException,
  Param,
  Req,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserGet } from 'src/interfaces/userGet';
import { Price } from 'src/mongo/schemas/price.schema';
import { PricesDto } from './price.dto';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { ErrorsApp } from 'src/common/errors';
import { MiddlePrice } from 'src/mongo/schemas/middle-prices/middle.prices';
import { Helpers } from 'src/projects/positions/helpers';

@Injectable()
export class PricesService {
  constructor(
    @InjectModel(Price.name) private priceModel: Model<Price>,
    @InjectModel(MiddlePrice.name) private middlePriceModel: Model<MiddlePrice>
  ) {}

  async findAll(@Req() req: RequestWithUser): Promise<Price[]> {
    const user = req.user;
    if (!user || typeof user !== "object" || !("_id" in user)) {
      throw new Error(ErrorsApp.EMPTY_USER);
    }
    const typedUser = user as unknown as UserGet;

    return this.priceModel.find({ owner: typedUser._id });
  }

  async create(
    priceDto: PricesDto,
    @Req() req: RequestWithUser
  ): Promise<Price> {
    const newPriceId = new Types.ObjectId();
    const user = req.user;
    if (!user || typeof user !== "object" || !("_id" in user)) {
      throw new Error(ErrorsApp.EMPTY_USER);
    }
    const typedUser = user as unknown as UserGet;

    if (typeof priceDto.price !== "number") {
      throw new Error("price isn`t number");
    }

    const prices = await this.priceModel.find({ owner: typedUser._id });

    const isExistPrice = prices.some(
      ({ title }) =>
        title.toLocaleLowerCase() === priceDto.title.toLocaleLowerCase()
    );

    if (isExistPrice) {
      throw new ConflictException(ErrorsApp.EXIST_PRICE(priceDto.title));
    }

    const newPrice = await this.priceModel.create({
      ...priceDto,
      id: newPriceId,
      owner: typedUser._id,
    });

    // await this.middlePricesService.addMiddlePrice({
    //   ...priceDto,
    //   id: newPriceId,
    //   owner: typedUser._id,
    // });

    await this.addMiddlePrice(
      {
      ...priceDto,
      id: newPriceId,
      owner: typedUser._id,
    }
    )

    return newPrice;
  }

  async update(
    @Param("priceId") priceId: Types.ObjectId,
    priceDto: PricesDto,
    @Req() req: RequestWithUser
  ): Promise<Price> {
    const user = req.user;
    if (!user || typeof user !== "object" || !("_id" in user)) {
      throw new Error(ErrorsApp.EMPTY_USER);
    }
    const typedUser = user as unknown as UserGet;

    const pricesList = await this.priceModel.find({
      owner: typedUser._id,
    });

    if (pricesList.length === 0) {
      throw new NotFoundException(ErrorsApp.NOT_PRICE);
    }
    const targetPrice = pricesList.filter(
      ({ id }) => id.toString() === String(priceId)
    );
    if (targetPrice.length === 0) {
      throw new NotFoundException(ErrorsApp.NOT_PRICE);
    }
    // await this.middlePricesService.updateMiddlePrice({
    //   ...priceDto,
    //   id: priceId,
    //   owner: typedUser._id,
    // });

    await this.updateMiddlePrice(
      {
      ...priceDto,
      id: priceId,
      owner: typedUser._id,
    }
    )

    return await this.priceModel.findByIdAndUpdate(
      { owner: typedUser._id, _id: targetPrice[0]._id },
      priceDto,
      { new: true, fields: ["-createdAt", "-updatedAt"] }
    );
  }

  async remove(
    @Param("priceId") priceId: Types.ObjectId,
    @Req() req: RequestWithUser
  ): Promise<Price> {
    const user = req.user;
    if (!user || typeof user !== "object" || !("_id" in user)) {
      throw new Error(ErrorsApp.EMPTY_USER);
    }
    const typedUser = user as unknown as UserGet;

    const pricesList = await this.priceModel.find({
      owner: typedUser._id,
    });

    if (pricesList.length === 0) {
      throw new NotFoundException(ErrorsApp.NOT_PRICE);
    }
    const targetPrice = pricesList.filter(
      ({ id }) => id.toString() === priceId.toString()
    );
    if (targetPrice.length === 0) {
      throw new NotFoundException(ErrorsApp.NOT_PRICE);
    }

    // await this.middlePricesService.removeMiddlePrice(priceId);

    await this.removeMiddlePrice(priceId);

    return this.priceModel.findOneAndDelete({
      owner: typedUser._id,
      _id: targetPrice[0]._id,
    });
  }

  async getAll() {
    return await this.middlePriceModel.find();
  }

  async addMiddlePrice(dto: PricesDto) {
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
      await this.middlePriceModel.findByIdAndUpdate(
        middlePrices[0]._id,
        {
          $push: {
            prices: { id: dto.id, price: dto.price, owner: dto.owner },
          },
        },
        { new: true }
      );
      const newMiddlePrices = await this.middlePriceModel.find({
        title: dto.title,
      });

      await this.middlePriceModel.findByIdAndUpdate(
        newMiddlePrices[0]._id,
        { $set: { price: Helpers.middlePrice(newMiddlePrices[0].prices) } },
        { new: true }
      );
    }
  }

  async updateMiddlePrice(dto: PricesDto) {
    const middlePrices = await this.middlePriceModel.find();
    if (middlePrices.length !== 0) {
      for (let i = 0; i < middlePrices.length; i++) {
        const prices = middlePrices[i].prices;
        for (let i = 0; i < prices.length; i++) {
          if (prices[i].id.toString() === dto.id.toString()) {
            prices[i].price = dto.price;
          }
        }
        await this.middlePriceModel.findByIdAndUpdate(
          middlePrices[i]._id,
          { $set: { prices } },
          { new: true }
        );
      }
    }

    const newMiddlePrices = await this.middlePriceModel.find();
    if (newMiddlePrices.length !== 0) {
      for (let i = 0; i < newMiddlePrices.length; i++) {
        const prices = newMiddlePrices[i].prices;
        if (prices.length !== 0) {
          await this.middlePriceModel.findByIdAndUpdate(
            newMiddlePrices[i]._id,
            { $set: { price: Helpers.middlePrice(prices) } },
            { new: true }
          );
        }
      }
    }
  }

  async removeMiddlePrice(@Param("priceId") priceId: Types.ObjectId) {
    const middlePrices = await this.middlePriceModel.find();
    if (middlePrices.length !== 0) {
      for (let i = 0; i < middlePrices.length; i++) {
        const prices = middlePrices[i].prices.filter(
          ({ id }) => id.toString() !== priceId.toString()
        );
        await this.middlePriceModel.findByIdAndUpdate(
          middlePrices[i]._id,
          { $set: { prices } },
          { new: true }
        );
      }
    }

    const newMiddlePrices = await this.middlePriceModel.find();
    if (newMiddlePrices.length !== 0) {
      for (let i = 0; i < newMiddlePrices.length; i++) {
        const prices = newMiddlePrices[i].prices;
        if (prices.length === 0) {
          await this.middlePriceModel.findByIdAndUpdate(
            newMiddlePrices[i]._id,
            { $set: { price: 0 } },
            { new: true }
          );
        }
        if (prices.length !== 0) {
          await this.middlePriceModel.findByIdAndUpdate(
            newMiddlePrices[i]._id,
            { $set: { price: Helpers.middlePrice(prices) } },
            { new: true }
          );
        }
      }
    }
  }
}

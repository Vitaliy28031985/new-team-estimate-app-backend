import { Model, Types } from 'mongoose';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { Review } from 'src/mongo/schemas/reviews.schema';
import { ReviewDto } from './review.dto';
export declare class ReviewsService {
    private ReviewsModel;
    constructor(ReviewsModel: Model<Review>);
    getAll(): Promise<(import("mongoose").Document<unknown, {}, Review> & Review & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    })[]>;
    create(req: RequestWithUser, reviewDto: ReviewDto): Promise<import("mongoose").Document<unknown, {}, Review> & Review & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    }>;
    update(reviewId: Types.ObjectId, reviewDto: ReviewDto, req: RequestWithUser): Promise<Review>;
    deleteReview(reviewId: Types.ObjectId, req: RequestWithUser): Promise<Review>;
}

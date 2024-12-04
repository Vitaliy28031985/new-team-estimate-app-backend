import { ReviewsService } from './reviews.service';
import { ReviewDto, ReviewUpdateDto } from './review.dto';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { Review } from 'src/mongo/schemas/reviews.schema';
import { Types } from 'mongoose';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    getAllReviews(): Promise<(import("mongoose").Document<unknown, {}, Review> & Review & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    })[]>;
    createReview(reviewDto: ReviewDto, req: RequestWithUser): Promise<Review>;
    updateReview(reviewId: Types.ObjectId, reviewUpdateDto: ReviewUpdateDto, req: RequestWithUser): Promise<Review>;
    delete(reviewId: Types.ObjectId, req: RequestWithUser): Promise<Review>;
}

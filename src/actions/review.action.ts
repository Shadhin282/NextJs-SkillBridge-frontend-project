'use server'

import { updateTag } from "next/cache";
import { ReviewService } from "../../services/review.service";
import { Review } from "../../types";


export const postReview = async (payload: Review)=>{
    const res = await ReviewService.postReview(payload);
    updateTag('reviewPost')
    return res
}
import { cookies } from "next/headers";
import { Review } from "../types";

export const ReviewService = {
    getReviewById : async function (id : string){
            try {
                const res = await fetch(`https://nextjs-skill-bridge-backend-project.onrender.com/api/reviews/${id}`);
            const reviewId = await res.json();
            if(reviewId.error){
              return {data: null, error: {message: "review data not get, occur happend"}}
            }
            return {data:reviewId, error : null};
            } catch (error) {
                return {data : null , error : { message  : " review data are not get" } }
            }
    },
    postReview : async function(payload:Review){
            try {
                const cookieStore = await cookies();
                const res = await fetch(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie : cookieStore.toString()
          },

          body: JSON.stringify(payload),
          next: {
            tags : ['reviewPost']
          }
        }
      );

      // if (!res.ok) {
      //   return {data : null, error : {message: "review not post"}}
      // }
      return {data : res, error : null}
            } catch (error) {
                // console.log(error)
                return {data: null, error: {message: "internal error"}}
            }
    }
}
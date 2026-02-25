import { cookies } from "next/headers";
import { Booking } from "../types";

export const BookingService = {
    getBooking : async function () {
        const cookieStore = await cookies();
        try {
            const res = await fetch(`https://nextjs-skill-bridge-backend-project.onrender.com/api/bookings`,{
          headers : {
            Cookie : cookieStore.toString(),
          }})
            const data = await res.json();
            if(data.error){
              return {data:null, error: {message: "Booking data not get"}}
            }
            return {data, error : null}
        } catch (error) {
            console.log(error)
            return { data : null , error : {message : "internal error, booking not fetch"}}
        }
    },

    getBookingById : async function (id : string) {
        const cookieStore = await cookies();
        try {
            const res = await fetch(`https://nextjs-skill-bridge-backend-project.onrender.com/api/bookings/${id}`,{
          headers : {
            Cookie : cookieStore.toString(),
          }})
            const data = await res.json();
          if(data.error){
            return {data: null, error : {message : "booking data not get"}}
          }
            return {data, error : null}
        } catch (error) {
            // console.log(error)
            return { data : null , error : {message : "internal error, booking not fetch"}}
        }
    },
    deleteBooking : async function(id:string){
            try {
                const cookieStore = await cookies();
                const res = await fetch(`https://nextjs-skill-bridge-backend-project.onrender.com/api/bookings/${id}`,{
                    method: "DELETE",
          headers : {
            Cookie : cookieStore.toString(),
          },
          next: {
            tags : ['bookingDelete']
          }
        })

          const data = await res.json();
          if(data.error){
            return {data: null , error :{message : "Booking not delete"}}
          }

          return {data: data, error : null}

            } catch (error) {
                console.log(error)
                return {data : null , error : {message: "Booking Delete Error"}}
            }
    },
    PostBooking : async function(payload : Booking){
          try {
            const cookieStore = await cookies();
            const res = await fetch(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie : cookieStore.toString()
          },
          body: JSON.stringify(payload),
          next:{
            tags: ['bookingPost']
          }
        }
      );

      // if(!res.ok){
      //   return {data: null, error:{message : "Data not post"}}
      // }

      return {data:res, error : null}

          } catch (error) {
            // console.log(error)
            return {data : null, error : {message : "Server error booking not able to do"}}
          }
    }
}
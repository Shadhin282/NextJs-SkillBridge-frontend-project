"use server"
import { revalidateTag } from "next/cache";
import { BookingService } from "../../services/booking.service"
import { Booking } from "../../types";


export const deleteBooking = async (id : string)=>{

    const res = await BookingService.deleteBooking(id);
    revalidateTag('bookingDelete','max')
    return res;
}

export const postBooking = async (payload: Booking)=>{
    const res = await BookingService.PostBooking(payload)
    
    return res;
}
"use server"
import { updateTag } from "next/cache";
import { BookingService } from "../../services/booking.service"
import { Booking } from "../../types";


export const deleteBooking = async (id : string)=>{

    const res = await BookingService.deleteBooking(id);
    updateTag('bookingDelete')
    return res;
}

export const postBooking = async (payload: Booking)=>{
    const res = await BookingService.PostBooking(payload)
    updateTag('bookingPost')
    return res;
}
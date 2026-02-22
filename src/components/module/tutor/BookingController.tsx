"use client";

import { useState } from "react";
import { toast } from "sonner";
import ButtonModal from "./ButtonModal";
import BookingModals from "./BookingModals";
import { Booking} from "../../../../types";
// import { createBookingAction } from "@/actions/booking.action";

export default function BookingController({ tutor }: Booking) {
  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const handleBook = async () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    const toastId = toast.loading("Booking session...");

    try {
    //   await createBookingAction({
    //     tutorId: tutor.id,
    //     ...selectedSlot,
    //   });

      toast.success("Booking successful 🎉", { id: toastId });
      setOpen(false);
      setSelectedSlot(null);
    } catch (error) {
      toast.error("Booking failed", { id: toastId });
    }
  };

  return (
    <>
      <ButtonModal onClick={() => setOpen(true)} />

      <BookingModals
        open={open}
        onClose={() => setOpen(false)}
        tutor={tutor}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
        onConfirm={handleBook}
      />
    </>
  );
}
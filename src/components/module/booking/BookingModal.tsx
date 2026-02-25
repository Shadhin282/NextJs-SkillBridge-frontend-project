'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { postBooking } from "@/actions/booking.action";

interface Props {
  tutorId: string;
  studentId: string;
  onSuccess?: () => void;
}

export default function BookingModal({
  tutorId,
  studentId,
  onSuccess,
}: Props) {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    subject: "",
    date: "",
    time: "",
    duration: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setLoading(true);

    try {

      const payload = {
        tutorId,
        studentId,
        subject: formData.subject,
        date: new Date(formData.date).toISOString(),
        time: new Date(`${formData.date}T${formData.time}`).toISOString(),
        duration: Number(formData.duration),
        status : "CONFIRMED"
      };
      console.log(payload)
      
    //   ..... fetch
    const res = await postBooking(payload)

      if (res.error) {
        return toast.error("Booking failed");
      }

      toast.success("Booking created successfully 🎉");

      setOpen(false);
      onSuccess?.();

    } catch (error) {
      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <Button className="w-full">
          Book Now
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">

        <DialogHeader>
          <DialogTitle>Book Session</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Subject */}
          <div>
            <Label>Subject</Label>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date */}
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Time */}
          <div>
            <Label>Time</Label>
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          {/* Duration */}
          <div>
            <Label>Duration (hours)</Label>
            <Input
              type="number"
              name="duration"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  );
}
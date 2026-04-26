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
import { createPaymentIntentAction } from "@/actions/payment.action";
import PaymentModal from "./PaymentModal";

interface Props {
  tutorId: string;
  studentId: string;
  hourlyRate: number;
  onSuccess?: () => void;
}

export default function BookingModal({
  tutorId,
  studentId,
  hourlyRate,
  onSuccess,
}: Props) {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [clientSecret, setClientSecret] = useState<string>("");

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

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const amount = (hourlyRate || 0) * Number(formData.duration);
      
      if (amount <= 0) {
        toast.error("Valid duration and rate are required");
        setLoading(false);
        return;
      }

      const { data, error } = await createPaymentIntentAction(amount);
      
      if (error || !data) {
        toast.error(error?.message || "Failed to initialize payment");
        setLoading(false);
        return;
      }

      setClientSecret(data.clientSecret);
      setStep(2);
    } catch (error) {
      toast.error("Failed to process payment request");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setLoading(true);
    let closeValues = false;
    try {
      const payload = {
        tutorId,
        studentId,
        subject: formData.subject,
        date: new Date(formData.date).toISOString(),
        time: new Date(`${formData.date}T${formData.time}`).toISOString(),
        duration: Number(formData.duration),
        status: "CONFIRMED",
        paymentIntentId, // The payment intent from stripe
      };
      
      const { data,error } = await postBooking(payload);

      if (error || !data) {
        toast.error(error.message || "Booking failed during confirmation");
        return;
      }

      toast.success("Payment successful! Booking confirmed 🎉");

      closeValues = true;
    } catch (error) {
      toast.error( "Booking verification failed");
    } finally {
      setLoading(false);
      if (closeValues) {
        setOpen(false);
        setStep(1);
        onSuccess?.();
      }
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setStep(1);
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full">
          Book Now
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{step === 1 ? "Book Session" : "Payment"}</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <form onSubmit={handleProceedToPayment} className="space-y-4">
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
              {loading ? "Generating Payment..." : `Proceed to Payment ($${(hourlyRate * Number(formData.duration)).toFixed(2)})`}
            </Button>
          </form>
        )}

        {step === 2 && clientSecret && (
          <PaymentModal 
            clientSecret={clientSecret} 
            onSuccess={handlePaymentSuccess} 
            onCancel={() => setStep(1)}
            amount={hourlyRate * Number(formData.duration)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
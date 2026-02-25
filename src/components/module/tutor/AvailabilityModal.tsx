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
import { postAvailability } from "@/actions/tutor.action";



interface Props {
  tutorId: string;
  onSuccess?: () => void;
}

export default function AvailabilityModal({
  tutorId,
  onSuccess,
}: Props) {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    day: "",
    startTime: "",
    endTime: "",
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

      if (!formData.day || !formData.startTime || !formData.endTime) {
        toast.error("All fields are required");
        return;
      }

      if (formData.endTime <= formData.startTime) {
        toast.error("End time must be after start time");
        return;
      }

      const payload = {
        tutorId,
        day: formData.day,
        startTime: formData.startTime,
        endTime: formData.endTime,
      };

      console.log(payload);

      const res = await postAvailability(payload);

      if (res?.error) {
        return toast.error("Failed");
      }

      toast.success("Availability saved successfully 🎉");

      setOpen(false);
      onSuccess?.();

    } catch (error) {
      toast.error("Failed to save availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <Button className="w-full">
          Set Availability
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">

        <DialogHeader>
          <DialogTitle>Set Availability</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Day */}
          <div>
            <Label>Day</Label>
            <Input
              name="day"
              placeholder="e.g. Monday"
              value={formData.day}
              onChange={handleChange}
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <Label>Start Time</Label>
            <Input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>

          {/* End Time */}
          <div>
            <Label>End Time</Label>
            <Input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Availability"}
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  );
}
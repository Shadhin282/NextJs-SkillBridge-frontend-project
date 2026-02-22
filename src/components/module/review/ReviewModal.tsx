'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { postReview } from "@/actions/review.action";

interface Props {
  tutorId: string;
  studentId: string;
  onSuccess?: () => void;
}

export default function ReviewModal({
  tutorId,
  studentId,
  onSuccess,
}: Props) {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setLoading(true);

    try {

      const payload = {
        tutorId,
        studentId,
        rating,
        comment,
      };

      const res = await postReview(payload)

      if (res.error) {
          toast.error("Failed to submit review");
      }

      toast.success("Review submitted successfully ⭐");

      setOpen(false);
      setRating(0);
      setComment("");
      onSuccess?.();

    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <Button variant="outline">
          Leave a Review
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle>Rate This Tutor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Rating Stars */}
          <div>
            <Label className="mb-2 block">Rating</Label>
            <div className="flex gap-2">
              {[1,2,3,4,5].map((star) => (
                <Star
                  key={star}
                  className={`cursor-pointer w-6 h-6 ${
                    star <= rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <Label>Comment (Optional)</Label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your feedback..."
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  );
}
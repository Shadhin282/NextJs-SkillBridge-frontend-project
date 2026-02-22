'use client';

import { useState } from "react";



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface StudentProfile {
  id: string;
  name: string;
  bio?: string;
  department?: string;
  FavroiteSubjects: string[];
}

interface Props {
  profile: StudentProfile;
  onSuccess?: () => void;
}

export default function StudentProfileUpdateModal({
  profile,
  onSuccess,
}: Props) {

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    name: profile.name || "",
    bio: profile.bio || "",
    department: profile.department || "",
    FavroiteSubjects: profile.FavroiteSubjects.join(", "),

  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

        name: formData.name,
        bio: formData.bio,
        department: formData.department,
        FavroiteSubjects: formData.FavroiteSubjects
          .split(",")
          .map((s) => s.trim()),

      };

      const res = await fetch(
        `http://localhost:4000/api/student-profile/${profile.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      toast.success("Profile updated");

      setOpen(false);

      onSuccess?.();

    } catch (error) {

      toast.error("Update failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>

        <Button>Edit Profile</Button>

      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle>Edit Profile</DialogTitle>

        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Bio */}
          <div>
            <Label>Bio</Label>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          {/* Department */}
          <div>
            <Label>Department</Label>
            <Input
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          {/* Favorite Subjects */}
          <div>
            <Label>Favorite Subjects</Label>
            <Input
              name="FavroiteSubjects"
              value={formData.FavroiteSubjects}
              onChange={handleChange}
              placeholder="Math, Programming"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </Button>

        </form>

      </DialogContent>

    </Dialog>

  );

}

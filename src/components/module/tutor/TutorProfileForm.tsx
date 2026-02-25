'use client'

import React, { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import * as z from 'zod'
import { toast } from 'sonner'
import { ArrowRight, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UpdateProfileAction } from '@/actions/tutor.action'



/* ---------------- Schema ---------------- */

const tutorProfileSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  hourlyRate: z.number().min(1, "Hourly rate required"),
  subjects: z.array(z.string()).min(1, "Add at least one subject"),
  categoryName: z.string().min(1, "Select a category"),
})

type Category = {
  name: string
}

interface Props {
  profile: {
    id: string
    bio?: string
    hourlyRate?: number
    subjects: string[]
    categoryName?: string
  }
  categoryList: Category[]
}

export default function TutorProfileUpdateForm({
  profile,
  categoryList,
}: Props) {

  const [subjectInput, setSubjectInput] = useState('')

  const form = useForm({
    defaultValues: {
      bio: profile.bio || '',
      hourlyRate: profile.hourlyRate || 0,
      subjects: profile.subjects || [],
      categoryName: profile.categoryName || '',
    },

    validators: {
      onSubmit: tutorProfileSchema
    },

    onSubmit: async ({ value }) => {

      const toastId = toast.loading("Updating Profile...")

      try {

        const res = await UpdateProfileAction({...value})

        if(res.error){
          return {message : "Profile data not update"}
        }

        toast.success("Profile updated successfully", { id: toastId })

      } catch (error) {

        toast.error("Failed to update profile", { id: toastId })

      }
    }
  })

  /* ---------------- Subjects ---------------- */

  const addSubject = () => {
    if (!subjectInput.trim()) return

    form.setFieldValue(
      "subjects",
      [...form.state.values.subjects, subjectInput.trim()]
    )

    setSubjectInput("")
  }

  const removeSubject = (index: number) => {
    const updated =
      form.state.values.subjects.filter((_, i) => i !== index)

    form.setFieldValue("subjects", updated)
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-3xl mx-auto p-6">

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-6"
      >

        {/* Bio */}
        <form.Field name="bio">
          {(field) => (
            <Textarea
              placeholder="Your bio"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="rounded-2xl"
            />
          )}
        </form.Field>

        {/* Hourly Rate */}
        <form.Field name="hourlyRate">
          {(field) => (
            <Input
              type="number"
             
              placeholder="Hourly Rate"
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(Number(e.target.value))
              }
              className="h-12 rounded-full"
            />
          )}
        </form.Field>

        {/* Subjects */}
        <div>
          <div className="flex gap-2">
            <Input
              placeholder="Subject"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              className="rounded-full"
            />
            <Button type="button" onClick={addSubject}>
              Add
            </Button>
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            {form.state.values.subjects.map((s, i) => (
              <div
                key={i}
                className="bg-muted px-3 py-1 rounded-full flex gap-2"
              >
                {s}
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => removeSubject(i)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Category */}
        <form.Field name="categoryName">
          {(field) => (
            <Select
              value={field.state.value}
              onValueChange={field.handleChange}
            >
              <SelectTrigger className="h-12 rounded-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryList.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </form.Field>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-12 rounded-full flex gap-2"
        >
          Update Profile
          <ArrowRight size={18} />
        </Button>

      </form>
    </div>
  )
}
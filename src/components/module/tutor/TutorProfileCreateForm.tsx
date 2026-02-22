'use client'

import React, { useState } from 'react'
import { useForm } from '@tanstack/react-form'
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
import { CreateTutorProfileAction } from '@/actions/tutor.action'

type Category = {
  name: string
}

interface Props {
  categoryList: Category[]
}

export default function TutorProfileCreateForm({
  categoryList,
}: Props) {

  const [subjectInput, setSubjectInput] = useState('')

  const form = useForm({
    defaultValues: {
      bio: '',
      hourlyRate: 0,
      subjects: [] as string[],
      categoryName: '',
    },

    onSubmit: async ({ value }) => {

      if (value.subjects.length === 0) {
        toast.error("Please add at least one subject")
        return
      }

      const toastId = toast.loading("Creating profile...")

      try {

        const payload = {
          bio: value.bio,
          hourlyRate: value.hourlyRate || 0,
          subjects: value.subjects,
          categoryName: value.categoryName,
        }
        console.log("pyaload",payload)
        const res = await CreateTutorProfileAction(payload)
        console.log("res isue",res)
        if (res?.error) {
          
          return toast.error("Tutor Data not updated, error found")
        }

        toast.success("Profile created successfully", { id: toastId })

      } catch (error) {
        console.error(error)
        toast.error("Something went wrong", { id: toastId })
      }
    },
  })

  /* ---------------- Subjects ---------------- */

  const addSubject = () => {
    const trimmed = subjectInput.trim()
    if (!trimmed) return

    if (form.state.values.subjects.includes(trimmed)) {
      toast.error("Subject already added")
      return
    }

    form.setFieldValue("subjects", [
      ...form.state.values.subjects,
      trimmed,
    ])

    setSubjectInput("")
  }

  const removeSubject = (index: number) => {
    const updated = form.state.values.subjects.filter((_, i) => i !== index)
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
              placeholder="Your bio (optional)"
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
              placeholder="Hourly Rate (optional)"
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(
                  e.target.value ? Number(e.target.value) : 0
                )
              }
              className="h-12 rounded-full"
            />
          )}
        </form.Field>

        {/* Subjects */}
        <div>
          <div className="flex gap-2">
            <Input
              placeholder="Add Subject"
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
                className="bg-muted px-3 py-1 rounded-full flex gap-2 items-center"
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
                <SelectValue placeholder="Select Category (optional)" />
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
          Create Profile
          <ArrowRight size={18} />
        </Button>

      </form>
    </div>
  )
}
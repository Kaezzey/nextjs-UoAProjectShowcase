'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import * as tw from '../app/tailwind'
import { Input } from '@/components/ui/input'
import { Textarea } from './ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Dynamically import ReactQuill for App Router compatibility
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    content: '', // 🆕 for the rich text
    imageFile: null as File | null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  return (
    <form action={() => {}} className={`${tw.startup_form} relative`}>
      {/* Title */}
      <div>
        <label htmlFor="title" className={tw.startup_form_label}>
          Title
        </label>
        <Input
          id="title"
          name="title"
          className={tw.startup_form_input}
          required
          placeholder="Project Title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        {errors.title && (
          <p className={tw.startup_form_error}>{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={tw.startup_form_label}>
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className={tw.startup_form_textarea}
          required
          placeholder="Project Description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        {errors.description && (
          <p className={tw.startup_form_error}>{errors.description}</p>
        )}
      </div>

      {/* Category */}
      <div className="relative">
        <label htmlFor="category" className={tw.startup_form_label}>
          Category
        </label>
        <Select
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, category: value }))
          }
          defaultValue={formData.category}
        >
          <SelectTrigger className={`${tw.startup_form_input} cursor-pointer`}>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="z-50 bg-white shadow-xl border rounded-md">
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && (
          <p className={tw.startup_form_error}>{errors.category}</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="image" className={tw.startup_form_label}>
          Upload Thumbnail
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setFormData((prev) => ({ ...prev, imageFile: file }))
            }
          }}
          className="block w-full border p-2 rounded text-sm"
        />
        {formData.imageFile && (
          <img
            src={URL.createObjectURL(formData.imageFile)}
            alt="Preview"
            className="mt-3 max-h-48 rounded"
          />
        )}
      </div>

      {/* Rich Text Editor */}
      <div className="mt-6">
        <label className={tw.startup_form_label}>Blog Content</label>
        <ReactQuill
          value={formData.content}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, content: value }))
          }
          className="bg-white rounded shadow"
        />
        {errors.content && (
          <p className={tw.startup_form_error}>{errors.content}</p>
        )}
      </div>
    </form>
  )
}

export default ProjectForm

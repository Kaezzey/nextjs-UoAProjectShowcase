'use client'

import React, { useState } from 'react'
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
import MDEditor from "@uiw/react-md-editor";
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    imageFile: null as File | null,
  })

  const [tag, setTag] = React.useState('');

  const isPending = false;
  

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
          <SelectContent className="z-50 bg-white shadow-xl border rounded-md" >
            <SelectItem value="technology" className="cursor-pointer">Technology</SelectItem>
            <SelectItem value="design" className="cursor-pointer">Design</SelectItem>
            <SelectItem value="education" className="cursor-pointer">Education</SelectItem>
            <SelectItem value="health" className="cursor-pointer">Health</SelectItem>
            <SelectItem value="entertainment" className="cursor-pointer">Entertainment</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && (
          <p className={tw.startup_form_error}>{errors.category}</p>
        )}
      </div>
    {/* Thumbnail Upload */}
    <div className="mt-6">
    {/* Top label */}
    <label htmlFor="image" className={tw.startup_form_label}>
        Upload Thumbnail
    </label>

    {/* Hidden file input */}
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
        className="hidden"
    />

    {/* Custom file button */}
    <div className="mt-2">
        <label
        htmlFor="image"
        className="inline-block cursor-pointer bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
        >
        Choose Image
        </label>
    </div>

    {/* Image name + preview */}
    {formData.imageFile && (
        <div className="mt-3">
        <p className="text-sm text-gray-600">{formData.imageFile.name}</p>
        <img
            src={URL.createObjectURL(formData.imageFile)}
            alt="Preview"
            className="mt-2 max-h-48 rounded border"
        />
        </div>
    )}
    </div>

    {/* Markdown Editor with Drag-and-Drop Image Upload */}
        <div
        data-color-mode="light"

        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (!file || !file.type.startsWith("image/")) return;

            const url = URL.createObjectURL(file);
            const markdownImage = `\n\n![${file.name}](${url})\n\n`;

            setTag((prev) => prev + markdownImage);
        }}
        >
        <label htmlFor="tag" className={tw.startup_form_label}>
            Blog Content
        </label>

        <MDEditor
            value={tag}
            onChange={(value) => setTag(value as string)}
            id="tag"
            preview="live"
            height={300}
            style= {{borderRadius: 20, overflow: "hidden"}}
            textareaProps={{
                placeholder: "Write your project content here..."
            }}
            previewOptions={{
                disallowedElements: ["style"],
            }}

        />

        {errors.description && (
            <p className={tw.startup_form_error}>{errors.description}</p>
        )}
        </div>

        <Button type='submit' className={`${tw.startup_form_btn} text-white`}
        disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit Your Project'}
            <Send className='size-6 ml-2'></Send>

        </Button>



    </form>
  )
}

export default ProjectForm

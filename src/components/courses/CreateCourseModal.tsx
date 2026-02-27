"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { useModal } from "@/hooks/useModal";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

interface CourseFormData {
  title: string;
  description: string;
  price: number;
  status: "draft" | "published" | "archived";
  image: string;
}

export default function CreateCourseModal() {
  const { isOpen, openModal, closeModal } = useModal();

  const mutation = useMutation({
    mutationFn: async (newCourse: CourseFormData) => {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      return response.json();
    },
    onSuccess: () => {
      closeModal();
      // Reload the page to show the newly created course, or invalidate query if it existed
      window.location.reload();
    },
    onError: (error) => {
      console.error(error);
      alert("Error creating course");
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      status: "draft" as "draft" | "published" | "archived",
      image: "",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  return (
    <>
      <Button onClick={openModal}>Add Course</Button>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-xl p-6">
        <div className="mb-5">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white/90">
            Create New Course
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Fill in the details below to create a new course.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field
            name="title"
            children={(field) => (
              <div>
                <Label>Course Title</Label>
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter course title"
                  required
                />
              </div>
            )}
          />

          <form.Field
            name="description"
            children={(field) => (
              <div>
                <Label>Description</Label>
                <textarea
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter course description"
                  required
                  className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-24 w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-3 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="price"
              children={(field) => (
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    min="0"
                    placeholder="Enter price"
                    required
                  />
                </div>
              )}
            />

            <form.Field
              name="status"
              children={(field) => (
                <div>
                  <Label>Status</Label>
                  <select
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(
                        e.target.value as "draft" | "published" | "archived",
                      )
                    }
                    className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm focus:ring-3 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              )}
            />
          </div>

          <form.Field
            name="image"
            children={(field) => (
              <div>
                <Label>Image URL (optional)</Label>
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter image URL"
                />
              </div>
            )}
          />

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                closeModal();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3.5 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition ring-inset hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className={`bg-brand-500 shadow-theme-xs hover:bg-brand-600 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-medium text-white transition ${mutation.isPending ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {mutation.isPending ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

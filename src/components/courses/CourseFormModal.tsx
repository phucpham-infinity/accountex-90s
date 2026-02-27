import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { useForm } from "@tanstack/react-form";
import { useUploadImage } from "@/hooks/useUploadImage";
import { IMaskInput } from "react-imask";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export interface CourseFormValues {
  title: string;
  description: string;
  price: number;
  status: "draft" | "published" | "archived";
  image: string;
}

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  descriptionText: string;
  defaultValues: CourseFormValues;
  onSubmit: (values: CourseFormValues) => void;
  isPending: boolean;
  submitLabel: string;
}

export default function CourseFormModal({
  isOpen,
  onClose,
  title,
  descriptionText,
  defaultValues,
  onSubmit,
  isPending,
  submitLabel,
}: CourseFormModalProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(defaultValues.image || null);

  const uploadImageMutation = useUploadImage();

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      if (imageFile) {
        uploadImageMutation.mutate(imageFile, {
          onSuccess: (url) => {
            onSubmit({ ...value, image: url });
          },
        });
      } else {
        onSubmit(value);
      }
    },
  });

  // Keep preview synced if re-opened with new defaultValues
  useEffect(() => {
    if (isOpen) {
      setImagePreview(defaultValues.image || null);
      form.reset();
    }
  }, [isOpen, defaultValues, form]);

  const handleClose = () => {
    setImageFile(null);
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const isLoading = isPending || uploadImageMutation.isPending;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-xl p-6">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white/90">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {descriptionText}
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-4">
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
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden shadow-theme-xs">
                <ReactQuill
                  theme="snow"
                  value={field.state.value}
                  onChange={(content) => field.handleChange(content)}
                  placeholder="Enter course description"
                  className="bg-white dark:bg-gray-900 dark:text-white/90 [&_.ql-toolbar]:dark:border-gray-700 [&_.ql-container]:dark:border-gray-700 [&_.ql-editor]:min-h-[120px]"
                />
              </div>
            </div>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <form.Field
            name="price"
            children={(field) => (
              <div>
                <Label>Price</Label>
                <IMaskInput
                  mask={Number}
                  scale={0}
                  thousandsSeparator=","
                  padFractionalZeros={false}
                  normalizeZeros={true}
                  unmask={true}
                  name={field.name}
                  value={String(field.state.value || "")}
                  onBlur={field.handleBlur}
                  onAccept={(value, mask) => {
                    field.handleChange(Number(mask.unmaskedValue) || 0);
                  }}
                  placeholder="Enter price"
                  required
                  className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800"
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
              <Label>Image (optional)</Label>
              <input
                type="file"
                accept="image/*"
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                  } else {
                    setImageFile(null);
                    setImagePreview(null);
                  }
                }}
                className="w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-gray-800 dark:file:text-gray-300"
              />
              {isLoading && imageFile && (
                <p className="mt-2 text-sm text-brand-500">
                  {uploadImageMutation.isPending
                    ? "Uploading image..."
                    : "Processing..."}
                </p>
              )}
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-24 w-36 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                </div>
              )}
            </div>
          )}
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3.5 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition ring-inset hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-brand-500 shadow-theme-xs hover:bg-brand-600 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-medium text-white transition ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {isLoading
              ? uploadImageMutation.isPending
                ? "Uploading..."
                : "Saving..."
              : submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
}

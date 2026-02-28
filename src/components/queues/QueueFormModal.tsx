"use client8nm";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";

interface QueueFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  descriptionText: string;
  defaultValues: { name: string; data: string };
  onSubmit: (values: { name: string; data: any }) => void;
  isPending: boolean;
  submitLabel: string;
}

export default function QueueFormModal({
  isOpen,
  onClose,
  title,
  descriptionText,
  defaultValues,
  onSubmit,
  isPending,
  submitLabel,
}: QueueFormModalProps) {
  const [name, setName] = useState(defaultValues.name);
  const [dataStr, setDataStr] = useState(defaultValues.data);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");

    if (!name) {
      setError("Name is required");
      return;
    }

    let parsedData = {};
    if (dataStr) {
      try {
        parsedData = JSON.parse(dataStr);
      } catch (err) {
        setError("Data must be a valid JSON string");
        return;
      }
    }

    onSubmit({ name, data: parsedData });
  };

  // Reset state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setName(defaultValues.name);
      setDataStr(defaultValues.data);
      setError("");
    }
  }, [isOpen, defaultValues]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-xl p-6">
      <div className="mb-6">
        <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {descriptionText}
        </p>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="text-sm text-error-500">
            {error}
          </div>
        )}

        <div>
          <label className="mb-2 pl-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Queue Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            placeholder="e.g. process-email"
            required
          />
        </div>

        <div>
          <label className="mb-2 pl-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Queue Data (JSON format)
          </label>
          <textarea
            value={dataStr}
            onChange={(e) => setDataStr(e.target.value)}
            rows={5}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            placeholder='{"key": "value"}'
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Saving..." : submitLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

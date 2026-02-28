"use client";

import { useModal } from "@/hooks/useModal";
import { useDeleteQueue } from "@/hooks/useDeleteQueue";
import { QueueJob } from "@/hooks/useQueues";
import { Modal } from "@/components/ui/modal";

interface DeleteQueueModalProps {
  queueJob: QueueJob;
}

export default function DeleteQueueModal({ queueJob }: DeleteQueueModalProps) {
  const { isOpen, openModal, closeModal } = useModal();

  const mutation = useDeleteQueue(() => {
    closeModal();
  });

  const handleDelete = () => {
    mutation.mutate(queueJob._id);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500 transition-colors"
        title="Delete Queue Job"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-md p-6">
        <div className="mb-5 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error-50 text-error-500 dark:bg-error-500/10 dark:text-error-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">
            Delete Queue Job
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this job (<strong>{queueJob.name}</strong>)? This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={closeModal}
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition ring-inset hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 min-w-[120px]"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={mutation.isPending}
            type="button"
            className={`inline-flex items-center justify-center gap-2 rounded-lg bg-error-500 px-5 py-2.5 text-sm font-medium text-white shadow-theme-xs transition hover:bg-error-600 min-w-[120px] ${mutation.isPending ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </>
  );
}

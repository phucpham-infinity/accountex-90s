"use client";

import { useModal } from "@/hooks/useModal";
import { useRetryQueue } from "@/hooks/useRetryQueue";
import { QueueJob } from "@/hooks/useQueues";
import { Modal } from "@/components/ui/modal";

interface RetryQueueModalProps {
  queueJob: QueueJob;
}

export default function RetryQueueButton({ queueJob }: RetryQueueModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const mutation = useRetryQueue(() => {
    closeModal();
  });

  const handleRetry = () => {
    mutation.mutate({ 
      name: queueJob.name, 
      data: queueJob.data, 
      retryJobId: queueJob._id 
    });
  };

  return (
    <>
      <button
        onClick={openModal}
        className="text-gray-500 hover:text-success-500 dark:text-gray-400 dark:hover:text-success-500 transition-colors"
        title="View Error & Retry Job"
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
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
          <path d="M3 3v5h5"></path>
        </svg>
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-md p-6">
        <div className="mb-5">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-warning-50 text-warning-500 dark:bg-warning-500/10 dark:text-warning-400">
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
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h3 className="mb-2 text-center text-xl font-bold text-gray-800 dark:text-white/90">
            Job Failed
          </h3>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50 my-4 text-sm">
            <p className="font-semibold text-gray-700 dark:text-gray-300">Fail Reason:</p>
            <p className="text-gray-600 dark:text-gray-400 mt-1 break-words">
              {queueJob.failReason || "Unknown Error"}
            </p>
            {queueJob.failedAt && (
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-3">
                Failed At: {new Date(queueJob.failedAt).toLocaleString()}
              </p>
            )}
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Are you sure you want to retry this job? It will be enqueued immediately.
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
            onClick={handleRetry}
            disabled={mutation.isPending}
            type="button"
            className={`inline-flex items-center justify-center gap-2 rounded-lg bg-success-500 px-5 py-2.5 text-sm font-medium text-white shadow-theme-xs transition hover:bg-success-600 min-w-[120px] ${mutation.isPending ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {mutation.isPending ? "Retrying..." : "Retry Job"}
          </button>
        </div>
      </Modal>
    </>
  );
}

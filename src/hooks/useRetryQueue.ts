import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

export const useRetryQueue = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { name: string; data?: any; retryJobId?: string }) => {
      try {
        const response = await axiosInstance.post("/api/admin/queues", payload);
        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to retry queue job");
      }
    },
    onSuccess: (data) => {
      toast.success(data.message || "Queue job retried successfully!");
      if (onSuccessCallback) {
        onSuccessCallback();
      }
      queryClient.invalidateQueries({ queryKey: ["queues"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Error retrying queue job");
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

export const useDeleteQueue = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axiosInstance.delete(`/api/admin/queues?id=${id}`);
        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to delete queue jobs");
      }
    },
    onSuccess: (data) => {
      toast.success(data.message || "Queue jobs deleted successfully!");
      if (onSuccessCallback) {
        onSuccessCallback();
      }
      queryClient.invalidateQueries({ queryKey: ["queues"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Error deleting queue jobs");
    },
  });
};

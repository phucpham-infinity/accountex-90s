import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

export const useDeleteJob = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axiosInstance.delete(`/api/admin/jobs?id=${id}`);
        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to delete job jobs");
      }
    },
    onSuccess: (data) => {
      toast.success(data.message || "Job jobs deleted successfully!");
      if (onSuccessCallback) {
        onSuccessCallback();
      }
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Error deleting job jobs");
    },
  });
};

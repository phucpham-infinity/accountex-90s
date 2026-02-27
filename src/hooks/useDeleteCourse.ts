import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

export const useDeleteCourse = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axiosInstance.delete(`/api/courses/${id}`);
        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to delete course");
      }
    },
    onSuccess: () => {
      toast.success("Course deleted successfully!");
      if (onSuccessCallback) {
        onSuccessCallback();
      }
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error deleting course");
    },
  });
};

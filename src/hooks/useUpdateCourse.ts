import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { CourseFormData } from "./useCreateCourse";

export const useUpdateCourse = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CourseFormData }) => {
      try {
        const response = await axiosInstance.put(`/api/courses/${id}`, data);
        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to update course");
      }
    },
    onSuccess: () => {
      toast.success("Course updated successfully!");
      if (onSuccessCallback) {
        onSuccessCallback();
      }
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error updating course");
    },
  });
};

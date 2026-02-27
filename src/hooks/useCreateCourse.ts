import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

export interface CourseFormData {
  title: string;
  description: string;
  price: number;
  status: "draft" | "published" | "archived";
  image: string;
}

export const useCreateCourse = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCourse: CourseFormData) => {
      try {
        const response = await axiosInstance.post("/api/courses", newCourse);
        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to create course");
      }
    },
    onSuccess: () => {
      toast.success("Course created successfully!");
      if (onSuccessCallback) {
        onSuccessCallback();
      }
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error creating course");
    },
  });
};

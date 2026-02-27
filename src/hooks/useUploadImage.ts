import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axiosInstance.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data?.data?.url as string;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to upload image");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error uploading image");
    },
  });
};

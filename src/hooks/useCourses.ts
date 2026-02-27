import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface Course {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface CoursesResponse {
  courses: Course[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const useCourses = (page: number = 1, limit: number = 10, search: string = "") => {
  return useQuery({
    queryKey: ["courses", { page, limit, search }],
    queryFn: async (): Promise<CoursesResponse> => {
      const response = await axiosInstance.get("/api/courses", {
        params: { page, limit, search },
      });
      return response.data?.data;
    },
  });
};

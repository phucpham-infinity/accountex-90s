import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface JobJob {
  _id: string;
  name: string;
  data: any;
  type: string;
  priority: number;
  nextRunAt: string | null;
  lastModifiedBy: string | null;
  lockedAt: string | null;
  lastRunAt: string | null;
  lastFinishedAt: string | null;
  failedAt?: string | null;
  failReason?: string | null;
}

export interface JobsResponse {
  jobs: JobJob[];
  total: number;
}

export function useJobs(
  page: number = 1,
  limit: number = 10,
  searchName: string = "",
) {
  return useQuery<JobsResponse, Error>({
    queryKey: ["jobs", page, limit, searchName],
    queryFn: async () => {
      const skip = (page - 1) * limit;
      const params = new URLSearchParams({
        limit: limit.toString(),
        skip: skip.toString(),
      });
      if (searchName) {
        params.append("name", searchName);
      }

      try {
        const response = await axiosInstance.get(
          `/api/jobs?${params.toString()}`,
        );
        return response.data.data;
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message || "Error retrieving job information",
        );
      }
    },
  });
}

import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

export function useLogin(onError?: (error: any) => void) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      try {
        const res = await axiosInstance.post("/api/auth/login", credentials);
        return res.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed");
      }
    },
    onSuccess: (data) => {
      // data from apiResponse: { code, message, data: { token, user } }
      if (data?.data?.token) {
        setAuth(data.data.token, data.data.user);
        router.push("/"); // redirect to dashboard
      }
    },
    onError: (error: any) => {
      if (onError) {
        onError(error);
      }
    },
  });
}

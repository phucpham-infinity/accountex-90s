import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export function useLogin(onError?: (error: any) => void) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }
      return data;
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

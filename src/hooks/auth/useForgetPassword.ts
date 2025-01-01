import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import React from "react";

const useForgetPassword = (
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const mutate = useMutation({
    mutationFn: async (data: { email: string }) => {
      const res = await instance.post("/auth/forget-password", data);
      return res.data;
    },
  });

  const handleForget = async (data: { email: string }) => {
    setLoading(true);
    mutate.mutate(data, {
      onSuccess: async () => {
        setSuccess(true);
        setLoading(false);
      },
      onError: (error: Error) => {
        setLoading(false);
        if (
          error instanceof AxiosError &&
          error.response?.data &&
          error.response?.data.code === 400
        ) {
          setError(error.response.data.message);
        } else {
          return ResponseErrorAxios(error);
        }
      },
    });
  };

  return { handleForget, loading, error };
};

export default useForgetPassword;

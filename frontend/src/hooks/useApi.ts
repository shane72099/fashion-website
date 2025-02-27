import { useState, useCallback } from 'react';
import { ApiError } from '@/types';
import toast from 'react-hot-toast';

interface UseApiOptions {
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    showErrorToast = true,
    showSuccessToast = false,
    successMessage = 'Operation successful',
  } = options;

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await apiFunction(...args);
        setData(result);
        if (showSuccessToast) {
          toast.success(successMessage);
        }
        return result;
      } catch (err: any) {
        const apiError: ApiError = {
          message: err.response?.data?.message || err.message || 'An error occurred',
          code: err.response?.data?.code,
          status: err.response?.status,
        };
        setError(apiError);
        if (showErrorToast) {
          toast.error(apiError.message);
        }
        throw apiError;
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction, showErrorToast, showSuccessToast, successMessage]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    error,
    isLoading,
    execute,
    reset,
  };
} 
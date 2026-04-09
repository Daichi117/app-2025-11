// components/household/hooks/useAsyncState.ts

import { useState, useCallback } from "react";
import toast from "react-hot-toast";

interface UseAsyncStateOptions {
  successMessage: string;
  errorMessage?: string;
  loadingMessage?: string;
}

export function  useAsyncState(options: UseAsyncStateOptions) {
  const { successMessage, errorMessage, loadingMessage } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const execute = useCallback(async (asyncFn: () => Promise<void>) => {
    setIsError(null);
    setIsLoading(true);

    try {
      await toast.promise(asyncFn(), {
        loading: loadingMessage ?? "処理中",
        success: successMessage,
        error: (err) => {
          return errorMessage ?? err.message ?? "エラーが発生しました";
        }
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "エラーが発生しました";
      setIsError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [successMessage, errorMessage, loadingMessage]);

  return { isLoading, isError, execute };
}

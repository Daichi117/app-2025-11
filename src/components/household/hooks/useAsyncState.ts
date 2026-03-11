// components/household/hooks/useAsyncState.ts

import { useState, useCallback } from "react";
import toast from "react-hot-toast";

interface UseAsyncStateOptions {
  successMessage: string;
  errorMessage?: string;
  loadingMessage?: string;
}

export function useAsyncState(options: UseAsyncStateOptions) {
  const { successMessage, errorMessage, loadingMessage } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const execute = useCallback(async (asyncFn: () => Promise<void>) => {
    console.log('🚀 useAsyncState: 処理開始');
    
    setIsError(null);
    setIsLoading(true);
    console.log('⏳ isLoading = true');

    try {
      console.log('📤 API呼び出し中...');
      
      await toast.promise(asyncFn(), {
        loading: loadingMessage ?? "処理中",
        success: successMessage,
        error: (err) => {
          console.error('❌ エラー発生:', err);
          return errorMessage ?? err.message ?? "エラーが発生しました";
        }
      });
      
      console.log('✅ 処理成功');
      
    } catch (err) {
      console.error('❌ catchブロック:', err);
      const errorMsg = err instanceof Error ? err.message : "エラーが発生しました";
      setIsError(errorMsg);
      console.log('❌ isError =', errorMsg);
    } finally {
      setIsLoading(false);
      console.log('⏹️ isLoading = false');
      console.log('🏁 useAsyncState: 処理完了');
    }
  }, [successMessage, errorMessage, loadingMessage]);

  return { isLoading, isError, execute };
}
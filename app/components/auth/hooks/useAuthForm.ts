import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// t関数の型を定義（型パズルにならない程度の厳密さ）
type TranslateFn = (key: string) => string;

export function useAuthForm(isLogin: boolean, t: TranslateFn) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [uiState, setUiState] = useState({
    isLoading: false,
    error: null as string | null,
  });

  // useCallbackで関数をメモ化。不要な再レンダリングを抑止
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUiState({ isLoading: true, error: null });

    // 1. バリデーション・ロジック
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setUiState({ isLoading: false, error: t("login.login.passwordMismatch") });
      return;
    }

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      
      // 2. ペイロード構築ロジック（isLoginに基づき完全に分離）
      // 不要なフィールドを含めないことで、バックエンドのバリデーションエラーを防ぐ
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { 
            username: formData.username, 
            email: formData.email, 
            password: formData.password 
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      // 3. 遷移ロジック
      if (isLogin) {
        router.push("/dashboard");
        router.refresh();
      } else {
        // 登録完了時はURLを書き換えてログインモードへ
        router.push("/login?mode=login");
      }
    } catch (err: any) {
      setUiState({ isLoading: false, error: err.message });
    } finally {
      // 成功してリダイレクトされる直前にloadingを戻しておく（安全策）
      setUiState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return { formData, uiState, handleChange, handleSubmit };
}
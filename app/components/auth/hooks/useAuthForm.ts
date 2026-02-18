import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type TranslateFn = (key: string) => string;

// ① フォームデータの型を明示（型安全性の向上）
type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

// ② UIの状態を明示（isLoadingとerrorを分離）
type UiState = {
  isLoading: boolean;
  error: string | null;
};

// ③ バリデーションロジックを関数として切り出す（handleSubmitをスッキリさせる）
function validateForm(isLogin: boolean, formData: FormData, t: TranslateFn): string | null {
  // メールアドレスの簡易チェック
  if (!formData.email.includes("@")) {
    return t("login.validation.invalidEmail") || "有効なメールアドレスを入力してください";
  }

  // パスワードの最低文字数チェック
  if (formData.password.length < 8) {
    return t("login.validation.passwordTooShort") || "パスワードは8文字以上にしてください";
  }

  // 新規登録時のみ：パスワード一致チェック
  if (!isLogin && formData.password !== formData.confirmPassword) {
    return t("login.login.passwordMismatch");
  }

  // 新規登録時のみ：名前の入力チェック
  if (!isLogin && !formData.name.trim()) {
    return t("login.validation.nameRequired") || "名前を入力してください";
  }

  return null; // エラーなし
}

export function useAuthForm(isLogin: boolean, t: TranslateFn) {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [uiState, setUiState] = useState<UiState>({
    isLoading: false,
    error: null,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // ④ 入力中にエラーをリセット（UX改善：入力し直したらエラーが消える）
    setUiState((prev) => ({ ...prev, error: null }));
  }, []);

  // ⑤ handleSubmit を useCallback で最適化
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // ⑥ バリデーションを先に実行（関数に切り出したことでスッキリ）
    const validationError = validateForm(isLogin, formData, t);
    if (validationError) {
      setUiState({ isLoading: false, error: validationError });
      return;
    }

    setUiState({ isLoading: true, error: null });

    try {
      const endpoint = isLogin ? "/api/auth/Login" : "/api/auth/Register";

      // ⑦ 送信データを変数に切り出す（bodyの中が長くなりすぎないように）
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password, name: formData.name };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // ⑧ 成功後にフォームをリセット（セキュリティ：パスワードを残さない）
      setFormData({ email: "", password: "", confirmPassword: "", name: "" });

      if (isLogin) {
        router.push("/dashboard");
        router.refresh();
      } else {
        router.push("/login?mode=login");
      }
    } catch (err: unknown) {
      // ⑨ err の型を unknown に（any より安全）
      const message = err instanceof Error ? err.message : "予期しないエラーが発生しました";
      setUiState({ isLoading: false, error: message });
    }
  }, [isLogin, formData, t, router]);

  return { formData, uiState, handleChange, handleSubmit };
}
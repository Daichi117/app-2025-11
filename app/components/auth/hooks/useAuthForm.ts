import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// t関数の型を定義（型パズルにならない程度の厳密さ）
type TranslateFn = (key: string) => string;

export function useAuthForm(isLogin: boolean, t: TranslateFn) {
  const router = useRouter(); // 画面遷移のための道具
  
  // 【記憶】入力された文字をリアルタイムで保持する箱
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });

  // 【状態】「通信中か？」「エラーはあるか？」という状況を管理
  const [uiState, setUiState] = useState({
    isLoading: false,
    error: null as string | null,
  });

  // 【更新】文字が入力されるたびに「記憶（formData）」を書き換える
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // ...prev は「他の項目を消さずに、指定した項目(name)だけ上書きする」というロジック
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // 【実行】ボタンが押された時のメイン処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ブラウザ独自のページリロードを阻止
    setUiState({ isLoading: true, error: null }); // ロード開始

    // ロジック：新規登録時のみ、パスワードの不一致をチェック
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setUiState({ isLoading: false, error: t("login.login.passwordMismatch") });
      return; // ここで終了（ガード節）
    }

    try {
      // ロジック：モードによって宛先URLを切り替える
      const endpoint = isLogin ? "/api/auth/Login" : "/api/auth/Register";
      
      // ロジック：サーバーが受け取れる形(JSON)に整える（Payloadの作成）
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isLogin ? { email: formData.email, password: formData.password } : formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message); // 失敗ならcatchへ飛ばす

      // 成功時の振る舞い
      if (isLogin) {
        router.push("/dashboard"); // ダッシュボードへ
        router.refresh(); // 最新の状態に更新
      } else {
        router.push("/login?mode=login"); // ログイン画面へ戻す
      }
    } catch (err: any) {
      setUiState({ isLoading: false, error: err.message }); // エラーを画面に表示
    }
  };

  // 最後に、これらを「顔（AuthForm）」が使えるようにエクスポート
  return { formData, uiState, handleChange, handleSubmit };
}
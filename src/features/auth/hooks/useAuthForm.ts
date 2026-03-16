// hooks/useAuthForm.ts

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAsyncState } from "@/components/household/hooks/useAsyncState"
import { TranslateFn } from "../types"

type FormData = {
  email: string
  password: string
  confirmPassword: string
  name: string
}

function validateForm(
  isLogin: boolean,
  formData: FormData,
  t: TranslateFn
): string | null {
  if (!formData.email.includes("@")) return t("login.login.invalidEmail")
  if (formData.password.length < 8) return t("login.login.passwordTooShort")
  if (!isLogin && formData.password !== formData.confirmPassword) return t("login.login.passwordMismatch")
  if (!isLogin && !formData.name.trim()) return t("login.login.nameRequired")
  return null
}

export function useAuthForm(isLogin: boolean, t: TranslateFn) {
  const router = useRouter()

  const { isLoading, isError, execute } = useAsyncState({
    successMessage: isLogin
      ? t("login.login.loginSuccess")
      : t("login.login.signupSuccess"),
    loadingMessage: isLogin
      ? t("login.login.loginLoading")
      : t("login.login.signupLoading"),
  })

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  })

  useEffect(() => {
    setFormData({ email: "", password: "", confirmPassword: "", name: "" })
  }, [isLogin])
  

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()

    console.log('╔════════════════════════════════════════╗');
    console.log('║  フォーム送信開始                      ║');
    console.log('╚════════════════════════════════════════╝');
    console.log('モード:', isLogin ? 'ログイン' : '新規登録');
    console.log('入力データ:', {
      email: formData.email,
      password: '***',
      name: formData.name,
    });

    // ━━━ ① バリデーション ━━━
    console.log('\n━━━ ① バリデーション ━━━');
    const vError = validateForm(isLogin, formData, t)
    
    if (vError) {
      console.log('❌ バリデーションエラー:', vError);
      return
    }
    console.log('✅ バリデーション通過');

    // ━━━ ② API呼び出し ━━━
    await execute(async () => {
      const endpoint = isLogin ? "/api/auth/Login" : "/api/auth/Register"
      
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password, name: formData.name }

      console.log('\n━━━ ② API呼び出し ━━━');
      console.log('エンドポイント:', endpoint);
      console.log('送信データ:', {
        ...payload,
        password: '***'
      });

      console.log('\n🌐 fetch実行中...');
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      // ━━━ ③ レスポンス受信 ━━━
      console.log('\n━━━ ③ レスポンス受信 ━━━');
      console.log('ステータスコード:', response.status);
      console.log('OK?:', response.ok);

      const data = await response.json()
      console.log('レスポンスデータ:', data);

      // ━━━ ④ エラーチェック ━━━
      console.log('\n━━━ ④ エラーチェック ━━━');
      if (!response.ok) {
        console.log('❌ APIエラー発生');
        console.log('エラーメッセージ:', data.message);
        throw new Error(data.message)
      }
      console.log('✅ API成功');

      // ━━━ ⑤ 成功後の処理 ━━━
      console.log('\n━━━ ⑤ 成功後の処理 ━━━');
      // router.push("?mode=login")
      // フォームをリセット
      setFormData({ email: "", password: "", confirmPassword: "", name: "" })
      console.log('フォームをリセットしました');
      if (isLogin) {
        console.log('✅ ログイン成功');
        console.log('→ ダッシュボードへリダイレクト');
        router.push("/dashboard")
        router.refresh()
      } else if(!isLogin) {
        console.log("新規登録成功");
        router.push("?mode=login");
        router.refresh()
      }
      else {
        console.log('✅ 登録成功');
        console.log('→ 登録完了フラグをON');
      }

      console.log('\n╔════════════════════════════════════════╗');
      console.log('║  処理完了                              ║');
      console.log('╚════════════════════════════════════════╝\n');
    })
  }, [isLogin, formData, t, router, execute])

  return {
    formData,
    isLoading,
    error: isError,
    handleChange,
    handleSubmit,
  }
}
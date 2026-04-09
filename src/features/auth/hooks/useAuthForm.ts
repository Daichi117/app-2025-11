import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAsyncState } from "@/components/household/hooks/useAsyncState"
import { TranslateFn } from "../types"
import toast from "react-hot-toast"
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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const vError = validateForm(isLogin, formData, t)
    
    if (vError) {
      toast.error(vError)
      return
    }

    await execute(async () => {
      const endpoint = isLogin ? "/api/auth/Login" : "/api/auth/Register"
      
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password, name: formData.name }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      const messageKey = data.messageKey ?? "login.login.serverError";
      const displayMessage = data.message ?? t(messageKey);
      if (!response.ok) {
        toast.error(displayMessage)
        throw new Error(displayMessage)
      }

      setFormData({ email: "", password: "", confirmPassword: "", name: "" })
      if (isLogin) {
        router.push("/dashboard")
        router.refresh()
      } else {
        router.push("/dashboard")
        router.refresh()
      }
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

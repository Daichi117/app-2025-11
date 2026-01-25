"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "contexts/LanguageContext";
import { useState, useMemo } from "react";
import Link from "next/link";

// 1. 定数・型の定義（マジックストリングを排除）
const AUTH_MODE = {
  LOGIN: "login",
  SIGNUP: "signup",
} as const;

type AuthMode = typeof AUTH_MODE[keyof typeof AUTH_MODE];


export function LoginPage() {
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();
  const searchParams = useSearchParams();

  // 2. URL状態の導出 (Derived State)
  const activeTab:AuthMode = useMemo(()=> {
    return searchParams.get("mode") === AUTH_MODE.SIGNUP ? AUTH_MODE.SIGNUP : AUTH_MODE.LOGIN;
  },[searchParams]);

  const isLogin = activeTab === AUTH_MODE.LOGIN;

  const [formData, setFormData] = useState({
    email : "",
    password :"",
    confirmPassword :"",
    username :"",
  })
  const [uiState, setUiState] = useState({ isLoading: false, error: null as string | null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target;
    setFormData(prev => ({...prev, [name]:value}));
  }
// 汎用的な入力ハンドラー
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUiState({ isLoading: true, error: null});
    if(!isLogin && formData.password !== formData.confirmPassword) {
      setUiState({ isLoading: false, error: t('login.passwordMismatch')});
      return;
    }

    try {
      const endpoint = isLogin ? "/api/auth/Login" : "/api/auth/Register";
      const payload = isLogin 
      ?{email:formData.email, password: formData.password} : {username:formData.username,email:formData.email,password:formData.password};

      const res = await fetch(endpoint,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Auth Error");

      //　成功時のリダイレクト
      router.push("/")
    }

  }
}
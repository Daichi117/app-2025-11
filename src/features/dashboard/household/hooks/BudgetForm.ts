import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAsyncState } from "@/components/household/hooks/useAsyncState"
import { TranslateFn } from "@/features/auth/types"
type FormData ={
    amount:string,
    category:string,
    date:string,
    memo:string
}

function validateForm (
    formData:FormData,
    t:TranslateFn
) {
    if(!formData.amount || formData.amount.trim()){return t("household.messages.invalidAmount")}
    const numAmount = Number(formData.amount);
    if(numAmount <= 0) return t("household.messages.zeroAmount")
    if(!formData.category) return t("household.messages.invalidCategory");
}

export function BudgetForm(t:TranslateFn) {
    const router = useRouter()
}
import { useEffect,useState } from "react";
import { budgetItem } from "../utils/useBudgetMoney";
import { PeriodInfo } from "../types/period";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";

export function useBudgetItems(type:string,refreshKey:number, periodInfo: PeriodInfo) {
    const { t } = useLanguage();
    const router = useRouter();
    const [items,setItems] = useState<budgetItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 一覧取得の責務をこの hook に集約し、UI 側は表示に専念させる。
    useEffect(()=> {
        if(type==="NONE") {
            setItems([]);
            setError(null);
            return;
        }

        // 非同期中に画面遷移した場合の setState を防ぐためのフラグ。
        let cancelled = false;

        async function loadItems() {
            setIsLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams({
                    startDate: periodInfo.startDate.toISOString(),
                    endDate: periodInfo.endDate.toISOString(),
                });

                if (type !== "INCOME") {
                    params.set("type", type);
                }

                const endpoint =
                    type === "INCOME"
                        ? `/api/household/income?${params.toString()}`
                        : `/api/household/expense?${params.toString()}`;

                const res = await fetch(endpoint,{credentials:"include"});
                const data = await res.json();

                if (res.status === 401) {
                    // 認証切れは空データ扱いにせず、明示的にログイン導線へ戻す。
                    if (!cancelled) {
                        setItems([]);
                        setError(t("household.api.authRequired"));
                        router.push("/login?mode=login");
                        router.refresh();
                    }
                    return;
                }

                if (!res.ok) {
                    throw new Error(data.message || t("household.api.serverError"));
                }

                if (!cancelled) {
                    // income/expense API の戻り値差分をここで吸収する。
                    const row = data.incomes ?? data.expenses ?? [];
                    setItems(row);
                }
            } catch (err) {
                if (!cancelled) {
                    setItems([]);
                    setError(err instanceof Error ? err.message : t("household.api.serverError"));
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        loadItems();

        return () => {
            cancelled = true;
        }
    },[type,refreshKey,periodInfo.startDate,periodInfo.endDate,router,t])
    return {items,setItems,isLoading,error}
}

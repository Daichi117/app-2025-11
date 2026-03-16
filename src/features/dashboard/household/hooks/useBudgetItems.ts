import { set } from "date-fns";
import { useEffect,useState } from "react";
import { budgetItem } from "../utils/useBudgetMoney";


export function useBudgetItems(type:string,refreshKey:number) {
    const [items,setItems] = useState<budgetItem[]>([]);
    useEffect(()=> {
        if(type==="NONE") return;

         const endpoint =
            type === "INCOME"
                ? "/api/household/income"
                : `/api/household/expense?type=${type}`
                fetch(endpoint,{credentials:"include"})
                .then(res=>res.json())
                .then(data=> {
                    const row = data.incomes ?? data.expenses ??[]
                    setItems(row)
                })
    },[type,refreshKey])
    return {items,setItems}
}
"use client" 
import { createContext,useState,useContext} from "react"

type typeRefetchType = {
    refetchTrigger:number,
    triggerRefetch:()=> void
}

const RefetchContext = createContext<typeRefetchType>({
    refetchTrigger:0,
    triggerRefetch:()=> {}
})

export function RefetchProvider({ children }: { children: React.ReactNode }) {
  const [refetchTrigger, setRefetchTrigger] = useState(0)
  const triggerRefetch = () => setRefetchTrigger(prev => prev + 1)

  return (
    <RefetchContext.Provider value={{refetchTrigger,triggerRefetch}}>
        {children}
    </RefetchContext.Provider>
  )
}

export const useRefetch =() => useContext(RefetchContext)
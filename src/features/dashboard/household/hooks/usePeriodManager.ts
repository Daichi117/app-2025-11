// app/dashboard/household/hooks/usePeriodManager.ts
import { useState, useMemo } from 'react';
import { startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear, format } from 'date-fns';
import { PeriodFilter, PresetPeriod, PeriodInfo } from '../types/period'

export function usePeriodManager(initialPeriod: PresetPeriod = 'monthly') {
  const [filter, setFilter] = useState<PeriodFilter>({ type: 'preset', period: initialPeriod });

  const periodInfo = useMemo((): PeriodInfo => {
    const today = new Date();
    
    // API (date-fns) を使えば、たった1行で開始日と終了日が取れる
    if (filter.type === 'preset') {
      switch (filter.period) {
        case 'daily': 
          return { label: format(today, 'yyyy/MM/dd'), startDate: startOfDay(today), endDate: endOfDay(today) };
        case 'monthly': 
          return { label: format(today, 'yyyy/MM'), startDate: startOfMonth(today), endDate: endOfMonth(today) };
        case 'yearly': 
          return { label: format(today, 'yyyy'), startDate: startOfYear(today), endDate: endOfYear(today) };
        default: 
          return { label: '全期間', startDate: new Date(0), endDate: new Date(9999, 11, 31) };
      }
    }
    // カスタム期間の場合
    return {
      label: `${filter.range.start} 〜 ${filter.range.end}`,
      startDate: startOfDay(new Date(filter.range.start)),
      endDate: endOfDay(new Date(filter.range.end))
    };
  }, [filter]);

  return { filter, periodInfo, setFilter };
}
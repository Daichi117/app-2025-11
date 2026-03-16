import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export type TimePeriod = 'monthly' | 'yearly' | 'all' | 'custom';

interface PeriodFilterProps {
  timePeriod: TimePeriod;
  setTimePeriod: (period: TimePeriod) => void;
  onCustomRange?: (start: string, end: string) => void  // ← カスタム期間を親に渡す
}

export default function PeriodFilter({ timePeriod, setTimePeriod, onCustomRange }: PeriodFilterProps) {
  const { t } = useLanguage();
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const periods: { id: TimePeriod; labelKey: string }[] = [
    { id: 'monthly', labelKey: 'household.period.monthly' },
    { id: 'yearly',  labelKey: 'household.period.yearly' },
    { id: 'all',     labelKey: 'household.period.all' },
    { id: 'custom',  labelKey: 'household.period.custom' },  // ← 追加
  ];

  const handleCustomApply = () => {
    if (!startDate || !endDate) return
    if (startDate > endDate) return  // 開始日が終了日より後の場合は無視
    onCustomRange?.(startDate, endDate)
  }

  return (
    <>
      <span className='font-semibold'>{t("household.period.label")}</span>
      <div className="flex flex-wrap gap-2">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => setTimePeriod(period.id)}
            className={`px-4 md:px-6 py-2 font-medium rounded-lg transition-all ${
              timePeriod === period.id
                ? 'bg-primary text-white shadow-sm'
                : 'bg-card text-foreground border border-border hover:bg-muted/50'
            }`}
          >
            {t(period.labelKey)}
          </button>
        ))}
      </div>

      {/* カスタム期間UI：customが選択された時だけ表示 */}
      {timePeriod === 'custom' && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="text-muted-foreground">〜</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleCustomApply}
            disabled={!startDate || !endDate || startDate > endDate}
            className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            {t("household.period.apply")}
          </button>
        </div>
      )}
    </>
  );
}
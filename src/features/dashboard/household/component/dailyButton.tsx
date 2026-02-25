import React from 'react';
import { TimePeriod } from '../utils/constants';
import { useLanguage } from '@/contexts/LanguageContext';

interface PeriodFilterProps {
  timePeriod: TimePeriod;
  setTimePeriod: (period: TimePeriod) => void;
}

export default function PeriodFilter({ timePeriod, setTimePeriod }: PeriodFilterProps) {
  const { t } = useLanguage();

  const periods: { id: TimePeriod; labelKey: string }[] = [
    { id: 'daily', labelKey: 'household.period.daily' },
    { id: 'monthly', labelKey: 'household.period.monthly' },
    { id: 'yearly', labelKey: 'household.period.yearly' },
    { id: 'all', labelKey: 'household.period.all' },
  ];

  return (

   <>
   <span className='font-semibold'>{t("household.period.label")}</span>
    <div className="flex flex-wrap gap-2">
      {/* ② 配列の中身を順番にボタンとして取り出す */}
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
   </>
   
  );
}
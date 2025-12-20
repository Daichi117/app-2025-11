import { useLanguage } from "contexts/LanguageContext";
import { InvestmentLevelCardProps } from "pages/home/types";

const colorConfig: Record<InvestmentLevelCardProps['color'], { hoverBorderColor: string }> = {
    primary: { hoverBorderColor: 'hover:border-primary/30' },
    secondary: { hoverBorderColor: 'hover:border-secondary/30' },
    accent: { hoverBorderColor: 'hover:border-accent/30' },
  };
  export function InvestmentLevelCard({ 
    amountKey, 
    periodKey, 
    titleKey, 
    descriptionKey, 
    color 
  }: InvestmentLevelCardProps) {
    const { t } = useLanguage();
    const config = colorConfig[color];
  
    return (
      <div className={`bg-white rounded-2xl p-10 shadow-lg border-2 border-border ${config.hoverBorderColor} hover:shadow-xl transition-all`}>
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-primary mb-3">{t(amountKey)}</div>
          <div className="text-muted-foreground">{t(periodKey)}</div>
        </div>
        <h4 className="text-2xl font-bold mb-4 text-center">{t(titleKey)}</h4>
        <p className="text-muted-foreground text-center leading-relaxed text-lg">
          {t(descriptionKey)}
        </p>
      </div>
    );
  }
  
  
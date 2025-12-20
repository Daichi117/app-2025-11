import { Language } from "i18n/types";

export type HomeViewProps = {
    language:"en" | "ja";
    setLanguage:(lang:string) => void;
    t:(key:string) => string;
}

export type HomeNavProps = HomeViewProps;

export type HomeHeroProps = {
  t: (key: string) => string;
};

export type HomeGuideProps = {
  t: (key: string) => string;
};

export type HomeCTAProps = {
  t: (key: string) => string;
};
export type InvestmentLevelCardColor = 'primary' | 'secondary' | 'accent';

export interface InvestmentLevelCardProps {
  amountKey: string;
  periodKey: string;
  titleKey: string;
  descriptionKey: string;
  color: InvestmentLevelCardColor;
}

import { usePathname } from "next/navigation";
import { useLanguage } from "../../../../contexts/LanguageContext";

export function useNavigation() {
    const pathname = usePathname();
    const {t} = useLanguage();

    const navItems = [
        {path:"/home",lable: t("home.nav.title")},
        {path:"/household",lable: t("household.nav.title")},
        {path:"/simulation",lable: t("simulation.nav.title")},
        {path:"/aiadvisor",lable: t("aiAdvisor.nav.title")}
    ]

    const isActive =(path:string) => {
        return pathname === path;
    }

    return {navItems, isActive};
}
"use client"
import { usePathname } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";

export function useNavigation() {
    const pathname = usePathname();
    const {t} = useLanguage();

    const navItems = [
        {path:"/dashboard",label: t("nav.home.title")},
        {path:"/dashboard/household",label: t("nav.household.title")},
        {path:"/simulation",label: t("nav.simulation.title")},
    ];

    const isActive = (path: string) => {
        const hasExactMatch = navItems.some((item) => item.path === pathname);

        // ルート("/") や未知のパスのときは常に最初のタブを強調表示
        if (!hasExactMatch) {
            return path === navItems[0].path;
        }

        return pathname === path;
    };

    return {navItems, isActive};
}
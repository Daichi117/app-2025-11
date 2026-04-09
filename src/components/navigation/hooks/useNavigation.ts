"use client"
import { usePathname } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";

export function useNavigation() {
    const pathname = usePathname();
    const {t} = useLanguage();

    const navItems = [
        {path:"/dashboard",label: t("nav.home.title")},
        {path:"/dashboard/household",label: t("nav.household.title")},
        {path:"/dashboard/simulation",label: t("nav.simulation.title")},
        {path:"/dashboard/todo",label: t("nav.todo.title")},
    ];

    const isActive = (path: string) => {
        if (path !== "/dashboard" && pathname.startsWith(path)) {
            return true;
        }
        if (path === "/dashboard" && pathname === "/dashboard") {
            return true;
        }
        return pathname === path;
    };

    return {navItems, isActive};
}

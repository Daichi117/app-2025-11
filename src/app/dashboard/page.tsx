"use client";
import { HomeNav } from "@/components/home/HomeNav";
import DashboardHeader from "@/components/navigation/dashboardHeader";
export default function DashboardPage() {
    return (
        <div>
            <HomeNav isLoggedIn={true}/>
            <DashboardHeader />
        </div>
    )
}
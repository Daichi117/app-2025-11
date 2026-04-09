import { redirect } from "next/navigation";
import { verifyAccessTokenServer } from "@/lib/auth";
import { HomeNav } from "@/components/home/HomeNav";
import DashboardHeader from "@/components/navigation/dashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await verifyAccessTokenServer();
  } catch {
    redirect("/login?mode=login");
  }

  return (
    <>
      <HomeNav isLoggedIn={true} />
      <DashboardHeader />
      {children}
    </>
  );
}

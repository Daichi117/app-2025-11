import { HomeNav } from '@/components/home/HomeNav'
import DashboardHeader from '@/components/navigation/dashboardHeader'
import React from 'react'

export default function page() {
  return (
    <div>
      <HomeNav isLoggedIn={true} />
      <DashboardHeader />
    </div>
  )
}

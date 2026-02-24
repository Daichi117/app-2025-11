"use client";
import Link from 'next/link'
import { useNavigation } from './hooks/useNavigation'
export default function DashboardHeader() {
    const {navItems, isActive} = useNavigation();
  return (
   <nav className='hidden md:block bg-white border-b border-border shadow-sm'>
    <div className='max-w-7xl mx-auto px-6 py-3'>
        <ul className='flex space-x-8'>
          {navItems.map((item)=>
          <li key={item.path}>
            <Link
            href={item.path}
            className={`text-sm font-medium transition-colors pb-3 border-b-2 ${
              isActive(item.path)
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-primary hover:border-primary/30"}`}
          >
            {item.label}
          </Link>
            
          </li>
        )}
        </ul>
    </div>
   </nav>
  )
}

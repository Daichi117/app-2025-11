export interface NavItemType {
    id: string;
    label: string;
    href: string;
    }
    
    
    export const publicNavItems: NavItemType[] = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'work', label: 'Work', href: '/work' },
    { id: 'contact', label: 'Contact', href: '/contact' },
    ];
    
    
    export const dashboardNavItems: NavItemType[] = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { id: 'post', label: 'New Post', href: '/post' },

    
    ];

    export const publicMainButton = {
        label: "Get Started",
        href: "/getstarted",
      };
      
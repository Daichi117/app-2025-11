export const isActive = (pathname: string | null | undefined, href: string) => {
    if (!pathname) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
    };
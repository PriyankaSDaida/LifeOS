"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, Wallet, BookHeart, User, Activity, Timer, Layers, Zap, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotificationManager } from './NotificationManager';
import { handleSignOut } from '@/actions/auth-actions';

const navItems = [
    { href: '/', label: 'Home', icon: LayoutDashboard },
    { href: '/calendar', label: 'Planner', icon: Calendar },
    { href: '/finance', label: 'Finance', icon: Wallet },
    { href: '/journal', label: 'Journal', icon: BookHeart },
    { href: '/habits', label: 'Habits', icon: Activity },
    { href: '/focus', label: 'Focus', icon: Timer },
    { href: '/projects', label: 'Projects', icon: Layers },
    { href: '/ideas', label: 'Ideas', icon: Zap },
    { href: '/about', label: 'About Me', icon: User },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <nav className="pointer-events-auto flex items-center gap-2 p-2 rounded-full border border-border/40 bg-background/70 backdrop-blur-xl shadow-lg supports-[backdrop-filter]:bg-background/30 transition-all hover:bg-background/90 hover:shadow-xl">

                <Link href="/" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary/50 transition-colors">
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-tr from-primary to-sky-500">
                        L
                    </span>
                </Link>

                <div className="w-px h-6 bg-border/50 mx-1" />

                <nav className="flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium transition-colors hover:text-foreground flex items-center gap-2 rounded-full",
                                pathname === item.href ? "text-foreground" : "text-muted-foreground hover:bg-secondary/50"
                            )}
                        >
                            {pathname === item.href && (
                                <motion.div
                                    layoutId="navbar-active"
                                    className="absolute inset-0 bg-background shadow-sm border border-border/50 rounded-full -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <item.icon className="h-4 w-4 relative z-10" />
                            <span className="relative z-10">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="w-px h-6 bg-border/50 mx-1" />

                <NotificationManager />

                <div className="w-px h-6 bg-border/50 mx-1" />
                <form action={handleSignOut}>
                    <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-secondary/50" title="Sign Out">
                        <LogOut className="h-4 w-4" />
                    </Button>
                </form>
            </nav>
        </div>
    );
}

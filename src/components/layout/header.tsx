"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import UserManu from "../auth/user-manu";
import ThemeToggle from "../theme/theme-toggle";

interface NavItem {
  label: string;
  href: string;
}

export default function Header() {
    const router = useRouter()
  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
  ];

  const {data:session, isPending} = useSession()

  return (
    <header className="border-b sticky top-0 z-10  shadow-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-extrabold">
            Next.js 15 Blog
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((nav) => (
              <Link
                key={nav.href}
                href={nav.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600"
                )}
              >
                {nav.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className=" flex items-center gap-4">
            <div className=" hidden md:block ">
                {/* keep it of search */}
            </div>
            <ThemeToggle/>
            {
              isPending ? null : session?.user ? <UserManu user={session?.user}/> : 
              <div className=" flex items-center gap-2">
                  <Button className=" cursor-pointer" onClick={()=>router.push('/auth')}>
                      Login
                  </Button>
              </div>
            }
            
        </div>
      </div>
    </header>
  );
}

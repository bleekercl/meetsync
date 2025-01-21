import { LayoutProps } from '@/lib/types/common';
import { MainNav } from "@/components/layout/main-nav";
import { UserNav } from "@/components/layout/user-nav";

export default function PrivateLayout({
  children,
}: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <MainNav />
          <UserNav />
        </div>
      </header>
      <div className="container flex-1 py-8">
        {children}
      </div>
    </div>
  );
} 
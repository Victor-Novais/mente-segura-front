'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarTrigger,
  SidebarProvider,
} from '@/components/ui/sidebar';

import { useToast } from '@/components/ui/use-toast';
import { usePathname, useRouter } from 'next/navigation';
import { LucideIcon, LogOut } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
  className?: string;
}

interface SidebarGroupType {
  label: string;
  items: SidebarItem[];
}

interface SidebarProps {
  groups: SidebarGroupType[];
  footerItems: SidebarItem[];
  onLogout: () => void;
  children: ReactNode;
  onItemClick?: (href: string) => void;
}

export function AppSidebar({
  groups,
  footerItems,
  onLogout,
  onItemClick,
  children,
}: SidebarProps) {
  const { toast } = useToast();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');

    document.cookie = 'token=; Max-Age=0';
    document.cookie = 'userRole=; Max-Age=0';

    toast({
      title: 'Sessão encerrada',
      description: 'Você foi desconectado com sucesso.',
    });

    router.push('/login');
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen w-full">
        <Sidebar
          side="left"
          variant="sidebar"
          collapsible="icon"
          className="sidebar"
        >
          <SidebarHeader>
            <div className="flex items-center px-2">
              <div className="font-bold text-xl text-mental-purple">
                Mente
                <span className="text-mental-purple-dark">Segura</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            {groups.map((group, index) => (
              <div key={group.label}>
                <SidebarGroup>
                  <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => {
                        const Icon = item.icon as React.ElementType;
                        return (
                          <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton
                              className={item.className} // 🔥 Importante para Tour
                              isActive={pathname === item.href}
                              onClick={() => {
                                if (onItemClick) {
                                  onItemClick(item.href);
                                } else {
                                  router.push(item.href);
                                }
                              }}
                            >
                              <Icon
                                className="h-5 w-5 text-mental-purple"
                                aria-hidden="true"
                              />
                              <span>{item.label}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                {index < groups.length - 1 && <SidebarSeparator />}
              </div>
            ))}
          </SidebarContent>

          <SidebarFooter>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {footerItems.map((item) => {
                    const Icon = item.icon as React.ElementType;
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          className={item.className}
                          isActive={pathname === item.href}
                          onClick={() => {
                            if (onItemClick) {
                              onItemClick(item.href);
                            } else {
                              router.push(item.href);
                            }
                          }}
                        >
                          <Icon
                            className="h-5 w-5 text-mental-purple"
                            aria-hidden="true"
                          />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}

                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout}>
                      <LogOut
                        className="h-5 w-5 text-mental-purple"
                        aria-hidden="true"
                      />
                      <span>Sair</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b dashboard-header">
            <SidebarTrigger className="md:hidden" />
          </header>

          <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

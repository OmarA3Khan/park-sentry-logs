
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Search, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="h-16 px-4 flex items-center justify-between">
              <div className="flex items-center">
                <SidebarTrigger />
                <h1 className="text-lg font-medium ml-4">Park Sentry</h1>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search..."
                    className="w-64 h-9 pl-9 rounded-md border bg-background"
                  />
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <nav className="flex px-4 pb-2 overflow-x-auto">
              <Link
                to="/"
                className={cn(
                  "px-3 py-1 mr-2 text-sm rounded-md transition-colors",
                  location.pathname === "/"
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )}
              >
                Dashboard
              </Link>
              <Link
                to="/car-parks"
                className={cn(
                  "px-3 py-1 mr-2 text-sm rounded-md transition-colors",
                  location.pathname === "/car-parks"
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )}
              >
                Car Parks
              </Link>
              <Link
                to="/equipment"
                className={cn(
                  "px-3 py-1 mr-2 text-sm rounded-md transition-colors",
                  location.pathname === "/equipment"
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )}
              >
                Equipment
              </Link>
              <Link
                to="/faults"
                className={cn(
                  "px-3 py-1 mr-2 text-sm rounded-md transition-colors",
                  location.pathname === "/faults"
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )}
              >
                Fault Reports
              </Link>
              {/* <Link
                to="/status"
                className={cn(
                  "px-3 py-1 mr-2 text-sm rounded-md transition-colors",
                  location.pathname === "/status"
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )}
              >
                Status
              </Link> */}
              <Link
                to="/users"
                className={cn(
                  "px-3 py-1 mr-2 text-sm rounded-md transition-colors",
                  location.pathname === "/users"
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )}
              >
                Users
              </Link>
            </nav>
          </header>
          <main className="flex-1 p-4 md:p-6 animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;

import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  Home, Calendar, Lightbulb, MessageSquare, Hash, Clock, Bookmark,
  BarChart3, Settings, Crown, Bell, Menu, X, Sparkles, LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Home", icon: Home, path: "/dashboard" },
  { title: "Content Calendar", icon: Calendar, path: "/dashboard/calendar" },
  { title: "AI Content Ideas", icon: Lightbulb, path: "/dashboard/ideas" },
  { title: "Caption Generator", icon: MessageSquare, path: "/dashboard/captions" },
  { title: "Hashtag Generator", icon: Hash, path: "/dashboard/hashtags" },
  { title: "Best Time to Post", icon: Clock, path: "/dashboard/best-time" },
  { title: "Saved Content", icon: Bookmark, path: "/dashboard/saved" },
  { title: "Analytics Overview", icon: BarChart3, path: "/dashboard/analytics" },
  { title: "Settings", icon: Settings, path: "/dashboard/settings" },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="h-16 flex items-center gap-2 px-5 border-b border-sidebar-border shrink-0">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-bold text-lg">ContentIQ</span>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-sidebar-foreground" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-accent text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border space-y-2">
          <Link to="/dashboard/billing" onClick={() => setSidebarOpen(false)}>
            <Button className="w-full gradient-bg border-0 text-primary-foreground text-sm hover:opacity-90">
              <Crown className="w-4 h-4 mr-2" /> Upgrade
            </Button>
          </Link>
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            <Button variant="ghost" className="w-full text-sm text-sidebar-foreground justify-start">
              <LogOut className="w-4 h-4 mr-2" /> Log out
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-6 shrink-0 bg-background/80 backdrop-blur-xl sticky top-0 z-30">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">Free Plan</span>
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full gradient-bg" />
            </button>
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-primary-foreground">
              U
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

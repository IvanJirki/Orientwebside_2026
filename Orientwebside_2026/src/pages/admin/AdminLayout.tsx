import { Outlet, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { LayoutDashboard, UtensilsCrossed, Tag, Home } from "lucide-react";

const AdminLayout = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-muted/30">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container flex max-w-6xl flex-wrap items-center justify-between gap-3 py-3">
          <nav className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Link
              to="/admin"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <LayoutDashboard className="h-4 w-4" />
              Etusivu
            </Link>
            <Link
              to="/admin/menu"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <UtensilsCrossed className="h-4 w-4" />
              Ruokalista
            </Link>
            <Link
              to="/admin/offers"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <Tag className="h-4 w-4" />
              Tarjoukset
            </Link>
            <Link to="/" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
              <Home className="h-4 w-4" />
              Sivusto
            </Link>
          </nav>
          <Button
            variant="outline"
            size="sm"
            className="touch-manipulation"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Kirjaudu ulos
          </Button>
        </div>
      </header>
      <main className="container max-w-6xl py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

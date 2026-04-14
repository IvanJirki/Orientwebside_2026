import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SiteConfigProvider } from "./contexts/SiteConfigContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Menu from "./pages/Menu";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMenuPage from "./pages/admin/AdminMenuPage";
import AdminOffersPage from "./pages/admin/AdminOffersPage";
import { ScrollToTop } from "./components/ScrollToTop";
import { WelcomeDialog } from "./components/WelcomeDialog";

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light">
    <LanguageProvider>
      <SiteConfigProvider>
        <AdminAuthProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >
              <ScrollToTop />
              <WelcomeDialog />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/tietoa" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/yhteystiedot" element={<ContactPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="menu" element={<AdminMenuPage />} />
                  <Route path="offers" element={<AdminOffersPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AdminAuthProvider>
      </SiteConfigProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;

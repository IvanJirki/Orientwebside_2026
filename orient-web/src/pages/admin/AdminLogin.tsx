import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, adminPasswordConfigured } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? "/admin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!adminPasswordConfigured) {
      setError("Aseta VITE_ADMIN_PASSWORD .env-tiedostoon ja käynnistä dev-palvelin uudelleen.");
      return;
    }
    if (login(password)) {
      navigate(from, { replace: true });
    } else {
      setError("Väärä salasana.");
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Hallintapaneeli</CardTitle>
          <CardDescription>Kirjaudu sisään muokataksesi ruokalistaa ja tarjouksia.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!adminPasswordConfigured && (
              <Alert>
                <AlertDescription>
                  Turvallisuus: määritä salasana tiedostossa <code className="rounded bg-muted px-1">.env</code>{" "}
                  avaimella <code className="rounded bg-muted px-1">VITE_ADMIN_PASSWORD</code>. Tuotannossa käytä
                  palvelinpuolen kirjautumista.
                </AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="admin-password">Salasana</Label>
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="touch-manipulation"
              />
            </div>
            <Button type="submit" className="w-full touch-manipulation">
              Kirjaudu
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;

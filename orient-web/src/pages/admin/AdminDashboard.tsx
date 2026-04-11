import { Link } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UtensilsCrossed, Tag } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hallinta</h1>
        <p className="text-muted-foreground">Valitse mitä muokata.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/admin/menu">
          <Card className="transition-colors hover:bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <UtensilsCrossed className="h-5 w-5 text-orient-red" />
                Sivusto & ruokalista
              </CardTitle>
              <CardDescription>
                Etusivun tekstit, hinnat ja annokset ilman koodin muuttamista (tallennus tähän selaimeen).
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/admin/offers">
          <Card className="transition-colors hover:bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Tag className="h-5 w-5 text-orient-red" />
                Tarjoukset
              </CardTitle>
              <CardDescription>Luo kampanjoita ja erikoistarjouksia asiakkaille.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

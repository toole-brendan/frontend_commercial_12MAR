import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Inventory from "@/pages/Inventory";
import Transfers from "@/pages/Transfers";
import SmartContracts from "@/pages/SmartContracts";
import Transactions from "@/pages/Transactions";
import Suppliers from "@/pages/Suppliers";
import Analytics from "@/pages/Analytics";
import Integrations from "@/pages/Integrations";
import Settings from "@/pages/Settings";

function App() {
  return (
    <>
      <AppLayout>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/transfers" component={Transfers} />
          <Route path="/smart-contracts" component={SmartContracts} />
          <Route path="/transactions" component={Transactions} />
          <Route path="/suppliers" component={Suppliers} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/integrations" component={Integrations} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </AppLayout>
      <Toaster />
    </>
  );
}

export default App;

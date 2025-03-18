import { Switch, Route, Router, Redirect } from "wouter";
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
import { AppProvider } from "@/context/AppContext";
import { BASE_PATH } from "@/lib/constants";
import { useEffect } from "react";

function App() {
  // Handle direct URL access by checking if we need to redirect
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/' || path === '') {
      window.history.replaceState(null, "", BASE_PATH);
    }
  }, []);

  return (
    <AppProvider>
      <Router base={BASE_PATH}>
        <AppLayout>
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/inventory" component={Inventory} />
            <Route path="/transfers" component={Transfers} />
            <Route path="/smart-contracts" component={SmartContracts} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/suppliers" component={Suppliers} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/integrations" component={Integrations} />
            <Route path="/settings" component={Settings} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </AppLayout>
      </Router>
      <Toaster />
    </AppProvider>
  );
}

export default App;

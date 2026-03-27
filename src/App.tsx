import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Onboarding from "./pages/Onboarding";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ContentIdeas from "./pages/dashboard/ContentIdeas";
import CaptionGenerator from "./pages/dashboard/CaptionGenerator";
import HashtagGenerator from "./pages/dashboard/HashtagGenerator";
import ContentCalendar from "./pages/dashboard/ContentCalendar";
import BestTimeToPost from "./pages/dashboard/BestTimeToPost";
import SavedContent from "./pages/dashboard/SavedContent";
import AnalyticsOverview from "./pages/dashboard/AnalyticsOverview";
import SettingsPage from "./pages/dashboard/SettingsPage";
import BillingPage from "./pages/dashboard/BillingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="ideas" element={<ContentIdeas />} />
            <Route path="captions" element={<CaptionGenerator />} />
            <Route path="hashtags" element={<HashtagGenerator />} />
            <Route path="calendar" element={<ContentCalendar />} />
            <Route path="best-time" element={<BestTimeToPost />} />
            <Route path="saved" element={<SavedContent />} />
            <Route path="analytics" element={<AnalyticsOverview />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="billing" element={<BillingPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

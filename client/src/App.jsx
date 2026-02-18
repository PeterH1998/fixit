import { Routes, Route } from "react-router-dom";
import AppShell from "@/components/AppShell";
import DevicesPage from "@/pages/DevicesPage";
import RepairsPage from "@/pages/RepairsPage";
import LandingPage from "@/pages/LandingPage";
import BookStep1Page from "@/pages/BookStep1Page";
import BookStep2Page from "@/pages/BookStep2Page";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/repairs" element={<RepairsPage />} />
        <Route path="/repairs/:deviceId" element={<RepairsPage />} />
        <Route path="/book" element={<BookStep1Page />} />
        <Route path="/book/:repairServiceId" element={<BookStep1Page />} />
        <Route path="/book/details" element={<BookStep2Page />} />
      </Routes>
    </AppShell>
  );
}

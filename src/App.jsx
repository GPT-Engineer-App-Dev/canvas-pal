import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import EventPage from "./pages/EventPage.jsx";
import VenuesPage from "./pages/VenuesPage.jsx";
import { SupabaseProvider } from "./integrations/supabase/index.js";

function App() {
  return (
    <SupabaseProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/event/:eventId" element={<EventPage />} />
          <Route path="/venues" element={<VenuesPage />} />
        </Routes>
      </Router>
    </SupabaseProvider>
  );
}

export default App;
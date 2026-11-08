
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import AdminGallery from "./pages/AdminGallery";
import ChangePassword from "./pages/ChangePassword";
import { useLocation } from "wouter";

export default function App() {
  const [location] = useLocation();

  return (
    <ErrorBoundary>
      {location === "/admin/change-password" ? (
        <ChangePassword />
      ) : location === "/admin" || location === "/admin/" ? (
        <AdminGallery />
      ) : (
        <Home />
      )}
    </ErrorBoundary>
  );
}

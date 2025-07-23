import "./App.css";
import Home from "./component/home";
import Nav from "./component/nav";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import SignIn from "./component/signIn";
import Dashboard from "./component/dashboard/Dashboard";
import Plants from "./component/dashboard/routes/plants";
import Order from "./component/dashboard/routes/order";
import SignUp from "./component/signUp";
import { OrderProvider } from "./context/OrderContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Favorites from "./component/dashboard/routes/favorites";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/signIn" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <FavoritesProvider>
      <OrderProvider>
        <AuthProvider>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
              {/* Re-enable ProtectedRoute for dashboard */}
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route path="plants" element={<Plants />} />
                <Route path="order" element={<Order />} />
                <Route path="favorites" element={<Favorites />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </OrderProvider>
    </FavoritesProvider>
  );
}

export default App;

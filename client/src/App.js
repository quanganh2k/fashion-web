import "./App.css";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteBase } from "./constants/routeUrl";
import Login from "./views/Login";
import { AuthProvider } from "./providers/authProviders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Cart from "./views/User/Cart";
import UserRoutes from "./utils/UserRoutes";
import AdminRoutes from "./utils/AdminRoutes";
import Dashboard from "./views/Admin/Dashboard";
import Register from "./views/Register";
import Page404 from "./views/Page404";

const cache = createCache({
  key: "css",
  prepend: true,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <CacheProvider value={cache}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Router>
              <Routes>
                <Route exact path={`${RouteBase.Login}`} element={<Login />} />
                <Route
                  exact
                  path={`${RouteBase.Register}`}
                  element={<Register />}
                />

                <Route element={<AdminRoutes />}>
                  <Route
                    exact
                    path={`${RouteBase.Dashboard}`}
                    element={<Dashboard />}
                  />
                </Route>

                <Route element={<UserRoutes />}>
                  <Route exact path={`${RouteBase.Cart}`} element={<Cart />} />
                </Route>
                
                <Route path="*" element={<Page404 />}></Route>
              </Routes>
            </Router>
            <ToastContainer
              position="top-right"
              autoClose="3000"
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <CssBaseline />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}

export default App;

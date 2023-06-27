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
import Cart from "./views/User/Cart/index";
import UserRoutes from "./utils/UserRoutes";
import AdminRoutes from "./utils/AdminRoutes";
import Register from "./views/Register";
import Page404 from "./views/Page404";
import CreateProduct from "./views/Admin/CreateProduct";
import Product from "./views/Admin/Product";
import EditProduct from "./views/Admin/EditProduct";
import Category from "./views/Admin/Category";
import CreateCategory from "./views/Admin/CreateCategory";
import EditCategory from "./views/Admin/EditCategory";
import Size from "./views/Admin/Size";
import CreateSize from "./views/Admin/CreateSize";
import EditSize from "./views/Admin/EditSize";
import Color from "./views/Admin/Color";
import CreateColor from "./views/Admin/CreateColor";
import EditColor from "./views/Admin/EditColor";
import Classify from "./views/Admin/Classify";
import CreateClassify from "./views/Admin/CreateClassify";
import EditClassify from "./views/Admin/EditClassify";
import Homepage from "./views/User/Homepage";
import { useGetListClassify } from "./hooks/classification/useGetListClassify";
import Loader from "./components/Loader";

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

const filtersClassify = {
  page: 1,
  limit: 12,
};

const AppRouteSwitcher = () => {
  //* Get all data that use global on web
  const { isLoading } = useGetListClassify(filtersClassify);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Routes>
        <Route exact path={`${RouteBase.Login}`} element={<Login />} />
        <Route exact path={`${RouteBase.Register}`} element={<Register />} />
        <Route exact path={RouteBase.Homepage} element={<Homepage />} />

        {/* <Route exact path={RouteBase.Homepage} element={<HomepageRedo />} /> */}

        <Route element={<AdminRoutes />}>
          <Route exact path={`${RouteBase.Product}`} element={<Product />} />
          <Route
            exact
            path={`${RouteBase.CreateProduct}`}
            element={<CreateProduct />}
          />

          <Route
            exact
            path={`${RouteBase.EditProduct}`}
            element={<EditProduct />}
          />
          <Route exact path={`${RouteBase.Category}`} element={<Category />} />
          <Route
            exact
            path={`${RouteBase.CreateCategory}`}
            element={<CreateCategory />}
          />
          <Route
            exact
            path={`${RouteBase.EditCategory}`}
            element={<EditCategory />}
          />
          <Route exact path={`${RouteBase.Size}`} element={<Size />} />
          <Route
            exact
            path={`${RouteBase.CreateSize}`}
            element={<CreateSize />}
          />
          <Route exact path={`${RouteBase.EditSize}`} element={<EditSize />} />
          <Route exact path={`${RouteBase.Color}`} element={<Color />} />
          <Route
            exact
            path={`${RouteBase.CreateColor}`}
            element={<CreateColor />}
          />
          <Route
            exact
            path={`${RouteBase.EditColor}`}
            element={<EditColor />}
          />
          <Route exact path={`${RouteBase.Classify}`} element={<Classify />} />
          <Route
            exact
            path={`${RouteBase.CreateClassify}`}
            element={<CreateClassify />}
          />
          <Route
            exact
            path={`${RouteBase.EditClassify}`}
            element={<EditClassify />}
          />
        </Route>

        <Route element={<UserRoutes />}>
          <Route exact path={`${RouteBase.Cart}`} element={<Cart />} />
        </Route>

        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <CacheProvider value={cache}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <AppRouteSwitcher />
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

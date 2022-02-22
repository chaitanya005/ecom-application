import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Switch,
  Link,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import Logout from "./components/Logout/Logout";
import { getJWT } from "./utils/jwt";
import AdminLayout from "./components/Admin/AdminLayout";
import CategoryLayout from "./components/Admin/Categories/CategoryLayout";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import FeaturedProducts from "./components/Home/Home";
import ViewProduct from "./components/ViewProducts/ViewProduct";
import AddProducts from "./components/Admin/Products/AddProducts";
import DisplayProducts from "./components/Admin/Products/DisplayProducts";
import { ProductLayout } from "./components/Admin/Products/ProductLayout";
import { ProductView } from "./components/Admin/Products/ProductView";
import Navbar from "./components/Navbar/Navbar";
import ProductsByCategory from "./components/ProductsByCategory/ProductsByCategory";
import FeaturedProductsList from "./components/Home/ProductList";
import FeaturedProductLayout from "./components/Admin/FeatureProducts/FeaturedProductLayout";
import { Edit } from "./components/Admin/Products/Edit";
import Cart from "./components/Cart/Cart";
import Address from "./components/Address/Address";
import NewAddress from "./components/Address/NewAddress";
import EditAddress from "./components/Address/EditAddress";
import Checkout from "./components/Address/Checkout";
import Add from "./components/Cart/Add";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password/:token" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/product/view/:id" element={<ViewProduct />} />
        <Route
          path="/admin/product/featured"
          element={<FeaturedProductLayout />}
        />
        <Route path="/admin/products/add" element={<AddProducts />} />
        <Route path="/admin/products" element={<ProductLayout />} />
        <Route path="/" element={<FeaturedProducts />}></Route>
        <Route path="/products/:category" element={<ProductsByCategory />} />
        <Route path="/admin/products/:id/view" element={<ProductView />} />
        <Route path="/admin/product/:id/update" element={<Edit />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user/address" element={<Address />} />
        <Route path="/user/address/new" element={<NewAddress />} />
        <Route path="/user/address/:id/edit" element={<EditAddress />} />
        <Route path="/checkout/:id" element={<Checkout />} />

        <Route path="/cart/add/:id" element={<Add />} />
        <Route
          exact
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/admin/categories"
          element={
            <PrivateRoute>
              <CategoryLayout />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
};

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}
function useAuth() {
  const jwt = getJWT();
  return jwt && jwt !== "undefined" && jwt !== "null";
}

export default App;

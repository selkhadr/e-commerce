import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './Layout/UserLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CollectionPage from './pages/CollectionPage'
import ProductDetails from './Products/ProductDetails'
import Checkout from './Cart/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import OrderDetails from './pages/OrderDetails'
import MyOrders from './pages/MyOrders'
import AdminLayout from './Admin/AdminLayout'
import AdminHomePage from './pages/AdminHomePage'
import UserManagement from './Admin/UserManagement'
import ProductManagement from './Admin/ProductManagement'
import EditProduct from './Admin/EditProduct'
import OrderManagement from './Admin/OrderManagement'

import {Provider} from "react-redux";
import store from './redux/store';
import ProtectedRoute from './Common/ProtectedRoute'

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />} >
          <Route index element={<Home/>} />
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="collections/:collection" element={<CollectionPage/>}/>
          <Route path="product/:id" element={<ProductDetails/>}/>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="order-confirmation" element={<OrderConfirmation/>}/>
          <Route path="order/:id" element={<OrderDetails/>}/>
          <Route path="my-orders" element={<MyOrders/>}/>
        </Route>Route
        {/* admin layout */}
        <Route path="/admin" element={<ProtectedRoute role="admin" > <AdminLayout/> </ProtectedRoute>}>
          <Route index element={<AdminHomePage/>}></Route>
          <Route path="users" element={<UserManagement/>}></Route>
          <Route path="products" element={<ProductManagement/>}></Route>
          <Route path="products/:id/edit" element={<EditProduct/>}></Route>
          <Route path="orders" element={<OrderManagement/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
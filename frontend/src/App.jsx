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

const App = () => {
  return (
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
        <Route path="/admin" element={<AdminLayout/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
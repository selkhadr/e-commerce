import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './Layout/UserLayout'
import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />} >
          <Route index element={<Home/>} />
        </Route>Route
        {/* admin layout */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
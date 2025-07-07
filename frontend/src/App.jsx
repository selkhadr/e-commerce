import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './Layout/UserLayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />} />
        {/* admin layout */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
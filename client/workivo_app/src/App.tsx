import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import UserDashboard from "./user/UserDashboard"
import AdminDashboard from "./admin/Admindashboard"
import { ProtectedRoutes } from "./components/ProtectedRoutes"

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes/>}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
    </>
  )
}

export default App

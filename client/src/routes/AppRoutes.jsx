import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import CoasterDetailsPage from "../pages/CoasterDetailsPage/CoasterDetailsPage"
import CoastersListPage from "../pages/CoastersListPage/CoastersListPage"
import SignupPage from "../pages/SignupPage/SignupPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import PrivateRoute from "./PrivateRoute"

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/galeria" element={<CoastersListPage />} />
            <Route path="/detalles/:coaster_id" element={<CoasterDetailsPage />} />
            <Route path="/registro" element={<SignupPage />} />
            <Route path="/acceder" element={<LoginPage />} />

            {/* Todas las rutas privadas están anidadas en PrivateRoute */}
            <Route element={<PrivateRoute />}>
                <Route path="/perfil" element={<h1>MI PERFIL (PROTEGIDA)</h1>} />
                <Route path="/admin" element={<h1>ADMIN (PROTEGIDA)</h1>} />
            </Route>

            <Route path="/*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default AppRoutes
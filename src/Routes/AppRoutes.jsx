import { Routes, BrowserRouter, Route } from "react-router-dom"
import AuthPage from "../pages/Auth/login"
import { AuthProvider } from "../context/AuthContext"
import Layout from "../components/Layout"
import Dashboard from "../pages/Dashboard/Dashboard"
import ProtectedRoute from "../components/ProtectedRoute"
import ClinicInfo from "../pages/Admin/ClinicInfo"
import UsersList from "../pages/Admin/UserList"
import AddUser from "../pages/Admin/AddUser"
import AddAppointment from "../pages/Patient/addAppo"
import MyAppointments from "../pages/Patient/AllAppo"
import AppointmentDetails from "../pages/Patient/SpecAppo"
import Queue from "../pages/Receptionist/Queue"
import DoctorQueue from "../pages/Doctor/Appo"
import AddMedicine from "../pages/Doctor/AddMedi"
import AddReport from "../pages/Doctor/AddRepot"

const AppRoutes = () => {
    return <>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/" element={<Layout />}>
                        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                            <Route path="/admin/clinic" element={<ClinicInfo />} />
                            <Route path="/admin/users" element={<UsersList />} />
                            <Route path="/admin/users/add" element={<AddUser />} />
                        </Route>
                        <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
                            <Route path="/doctor/queue" element={<DoctorQueue />} />
                             <Route path="/doctor/prescriptions/:appointmentId" element={<AddMedicine />} /> 
                            <Route path="/doctor/reports/:appointmentId" element={<AddReport />} />  
                        </Route>

                        <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
                            <Route path="/patient/book" element={<AddAppointment />} />
                            <Route path="/patient/my-appointments" element={<MyAppointments />} />
                            <Route path="/patient/appointments/:id" element={<AppointmentDetails />} />
                        </Route>

                        <Route element={<ProtectedRoute roles={["receptionist"]} />}>
                            <Route path="/rec/queue" element={<Queue />} />
                        </Route>
                    </Route>

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </>
}

export default AppRoutes
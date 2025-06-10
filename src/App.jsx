import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";

import Layout from "./Pages/Layout";
import Homepage from "./Pages/Homepage";
import Login from "./components/Auth/Login";
import Otp from "./components/Auth/Otp";
import Dashboard from "./Pages/Farmer/Dashboard";
import DashboardLayout from "./Layout/DashboardLayout";
import Animals from "./Pages/Farmer/Animals";
import Report from "./Pages/Farmer/Report";
import Devices from "./Pages/Farmer/Devices";
import Alert from "./Pages/Farmer/Alert";
import FarmerProfile from "./Pages/Farmer/FarmerProfile";
import Location from "./Pages/Farmer/Location";
import AnimalProfile from "./components/AnimalProfile";
import RoleSelection from "./components/Auth/RoleSelection";
import FarmerForm from "./components/Auth/FarmerForm";
import VetDashboardLayout from "./Layout/VetDashboardLayout";
import VetForm from "./components/Auth/VetForm";
import FarmerOnboarding from "./components/Auth/FarmerOnboarding";
import VetOnboarding from "./components/Auth/VetOnboarding";
import BookAppointment from "./components/BookAppointment";
import Vet from "./Pages/Farmer/Vet";
import VetProfile from "./components/VetProfile";
import Farmer from "./Pages/vet/Farmer";
import Messages from "./Pages/vet/Messages";
import Appointment from "./Pages/vet/Appointment";
import VetDashboard from "./Pages/vet/VetDashboard";
import VetAlert from "./Pages/vet/VetAlert";
import Analytics from "./Pages/vet/Analytics";
import VetMainProfile from "./Pages/vet/VetMainProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
      </Route>{" "}
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/farmer-form" element={<FarmerForm />} />
      <Route path="farmer-onboarding" element={<FarmerOnboarding />} />
      <Route path="/vet-form" element={<VetForm />} />
      <Route path="/vet-onboarding" element={<VetOnboarding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route element={<DashboardLayout />}>
        <Route path="/farmer-dashboard" element={<Dashboard />} />
        <Route path="/animal" element={<Animals />} />
        <Route path="/animal-profile/:id" element={<AnimalProfile />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/alerts" element={<Alert />} />
        <Route path="/vet" element={<Vet />} />
        <Route path="/vet-profile/:id" vet element={<VetProfile />} />
        <Route path="/vet-profile/:id/book" element={<BookAppointment />} />
        <Route path="/farmer-profile" element={<FarmerProfile />} />
      </Route>
      {/* Vet Dashboard */}
      <Route element={<VetDashboardLayout />}>
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/vet-dashboard" element={<VetDashboard />} />
        <Route path="/farmer" element={<Farmer />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/vet-alerts" element={<VetAlert />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="vetmain-profile" element={<VetMainProfile />} />
      </Route>
    </Route>
  )
);

/* Create a supabase client using environment variables */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* Create a QueryClient instance for TanStack Query */
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </QueryClientProvider>
  );
}

/* Export the supabase client (or a context) so that components can use it for data fetching */
export { supabase };
export default App;

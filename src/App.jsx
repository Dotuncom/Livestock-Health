import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Pages/Layout";
import Homepage from "./Pages/Homepage";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
igimport Otp from "./components/Auth/Otp";
import Dashboard from "./Pages/Farmer/Dashboard";
import DashboardLayout from "./Layout/DashboardLayout";
import Animals from "./Pages/Farmer/Animals";
import Report from "./Pages/Farmer/Report";
import Devices from "./Pages/Farmer/Devices";
import Alert from "./Pages/Farmer/Alert";
import Profile from "./Pages/Farmer/Profile";
import Location from "./Pages/Farmer/Location";
import AnimalProfile from "./components/AnimalProfile";
import RoleSelection from "./components/Auth/RoleSelection";
import FarmerForm from "./components/Auth/FarmerForm";
import VetDashboardLayout from "./Layout/VetDashboardLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
      </Route>
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/farmer-form" element={<FarmerForm />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth" element={<Otp />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/animal" element={<Animals />} />
        <Route path="/animal-profile" element={<AnimalProfile />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/alerts" element={<Alert />} />
        <Route path="/location" element={<Location />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      {/* {vvetdashboard } */}
      <Route element={<VetDashboardLayout/>}>
      <Route path="/vetdashboard" element={<etDashboard />} />

      </Route>

    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

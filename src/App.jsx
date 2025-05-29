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
import Otp from "./components/Auth/Otp";
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
import VetForm from "./components/Auth/VetForm";
import FarmerOnboarding from "./components/Auth/FarmerOnboarding";
import VetOnboarding from "./components/Auth/VetOnboarding";
import BookAppointment from "./components/BookAppointment";
import Vet from "./Pages/Farmer/Vet";
import VetProfile from "./components/VetProfile";
import Farmer from "./Pages/vet/Farmer";
import Messages from "./Pages/vet/Messages";
import FarmerReport from "./Pages/vet/FarmerReport";
import Appointment from "./Pages/vet/Appointment";
import VetDashboard from "./Pages/vet/VetDashboard";
import VetAlert from "./Pages/vet/VetAlert";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
      </Route>
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/farmer-form" element={<FarmerForm />} />
      <Route path="farmer-onboarding" element={<FarmerOnboarding/>}/>
      <Route path='/vet-form' element={<VetForm/>}/>
      <Route path='/vet-onboarding' element={<VetOnboarding/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route element={<DashboardLayout />}>
        <Route path="/farmer-dashboard" element={<Dashboard />} />
        <Route path="/animal" element={<Animals />} />
        <Route path="/animal-profile/:id"  element={<AnimalProfile />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/alerts" element={<Alert />} />
        <Route path="/vet-profile/:id" vet element={<VetProfile/>}/>
        <Route path='/vet' element={<Vet/>}/>
        <Route path='/book-appointment/:id' element ={<BookAppointment/>}/>
        <Route path="/profile" element={<Profile />} />
      </Route>
      {/* {vetdashboard } */}
      <Route element={<VetDashboardLayout/>}>
      <Route path='/appointment' element={<Appointment/>}/>
      <Route path='/vet-dashboard' element={<VetDashboard/>} />
      <Route path='/farmer' element={<Farmer/>}/>
      <Route path='/messages' element={<Messages/>}/>
      <Route path='/vet-alerts' element={<VetAlert/>}/>
      <Route path='/farmer-report' element={<FarmerReport/>}/>
      </Route>

    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

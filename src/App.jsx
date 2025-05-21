import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Pages/Layout";
import Homepage from "./Pages/Homepage";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Otp from "./Pages/Otp";
import Dashboard from "./Pages/Farmer/Dashboard";
import DashboardLayout from "./Layout/DashboardLayout";
import Animals from "./Pages/Farmer/Animals";
import Report from "./Pages/Farmer/Report";
import Devices from "./Pages/Farmer/Devices";
import Alert from "./Pages/Farmer/Alert";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Layout />}>
        <Route path='/' element={<Homepage />} />
      </Route>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/auth' element={<Otp />} />
    <Route element={<DashboardLayout/>}>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/animal' element={<Animals/>}/>
      <Route path="/reports" element={<Report/>}/>
      <Route path='/devices' element ={<Devices/>}/>
      <Route path="/alert" element={<Alert/>}/>

    </Route>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

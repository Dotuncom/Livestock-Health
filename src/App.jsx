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
// import Login from "./Pages.jsx/Login";

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
    </Route>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

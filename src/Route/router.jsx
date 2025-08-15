import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Registration from "../Pages/Auth/Registration";
import SportsEquipment from "../Pages/SportsEquipment/SportsEquipment";
import AddSportsEquipment from "../Pages/AddSportsEquipment/AddSportsEquipment";
import UpdateSportsEquipment from "../Pages/UpdateSportsEquipment/UpdateSportsEquipment";
import Users from "../Pages/Users/Users";
import Dashboard from "../Pages/Dashboard/Dashboard";



const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            index: true,
            element: <Home></Home>
        },
        {
            path: "/sportsequipment",
            element: <SportsEquipment></SportsEquipment>,
            loader: () => fetch('https://equi-sports-server-zeta.vercel.app/sports')
        },
      ]
    },
    {
        path:"/login",
        element: <Login></Login>,
    },
    {
        path:"/registration",
        element: <Registration></Registration>,
    },
    {
      path: "/users",
      element: <Users></Users>,
      loader: () => fetch('https://equi-sports-server-zeta.vercel.app/users')
    },
    {
      path: "/addsportsequipment",
      element: <AddSportsEquipment></AddSportsEquipment>,
    },
    {
      path: "/updatesportsequipment/:id",
      element: <UpdateSportsEquipment></UpdateSportsEquipment>,
      loader: ({params}) => fetch(`https://equi-sports-server-zeta.vercel.app/sports/${params.id}`),
    },
    {
      path:"/dashboard",
      element: <Dashboard></Dashboard>,
    }
    
  ]);
  export default router;
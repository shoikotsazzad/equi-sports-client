import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Registration from "../Pages/Auth/Registration";
import SportsEquipment from "../Pages/SportsEquipment/SportsEquipment";
import AddSportsEquipment from "../Pages/AddSportsEquipment/AddSportsEquipment";
import UpdateSportsEquipment from "../Pages/UpdateSportsEquipment/UpdateSportsEquipment";



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
        },
      ]
    },
    {
        path:"/login",
        element: <Login></Login>,
    },
    {
        path:"/registration",
        element: <Registration></Registration>
    },
    {
      path: "/addsportsequipment",
      element: <AddSportsEquipment></AddSportsEquipment>,
    },
    {
      path: "/updatesportsequipment",
      element: <UpdateSportsEquipment></UpdateSportsEquipment>,
    },
    
  ]);
  export default router;
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Registration from "../Pages/Auth/Registration";
import SportsEquipment from "../Pages/SportsEquipment/SportsEquipment";
import AddSportsEquipment from "../Pages/AddSportsEquipment/AddSportsEquipment";
import UpdateSportsEquipment from "../Pages/UpdateSportsEquipment/UpdateSportsEquipment";
import Users from "../Pages/Users/Users";



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
            loader: () => fetch('http://localhost:4000/sports')
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
      loader: () => fetch('http://localhost:4000/users')
    },
    {
      path: "/addsportsequipment",
      element: <AddSportsEquipment></AddSportsEquipment>,
    },
    {
      path: "/updatesportsequipment/:id",
      element: <UpdateSportsEquipment></UpdateSportsEquipment>,
      loader: ({params}) => fetch(`http://localhost:4000/sports/${params.id}`),
    },
    
  ]);
  export default router;
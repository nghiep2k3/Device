import {
    createBrowserRouter,
  } from "react-router-dom";
import Login from "./pages/Authorization/login";
import Change from "./pages/Profile/components/ChangePassWord";
import Menus from "./pages/Profile/menu";
import ListUser from "./pages/Profile/components/Profile";
import UserUpdate from "./pages/Profile/components/Update";
import UserManager from "./pages/Profile/User/UserManager";
import Details from "./pages/Profile/User/Detail";
import Create from "./pages/Profile/User/Create";
import Edit from "./pages/Profile/User/Edit";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
      children :[{
        path: '/ChangePassWord',
        element: <Change />,
      }, {
        path: '/ChangePassWord',
        element:<Menus />
      },
      {
        path: '/ListUser',
        element:<ListUser />,
      },
      {
        path: '/UserUpdate',
        element:<UserUpdate />,
      },
      {
        path: '/UserManager',
        element:<UserManager />,
      },
      {
        path: '/Details',
        element:<Details />,
      },
      {
        path: '/Create',
        element:<Create />,
      },
      {
        path: '/Edit/:id',
        element:<Edit />,
      }
    ]
    }
  ]);

  export default router;
  

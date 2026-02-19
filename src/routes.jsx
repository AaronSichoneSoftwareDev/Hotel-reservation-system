import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import Bookings from "./pages/Bookings/Bookings";
import Rooms from "./pages/Rooms/Rooms";
import Payments from "./pages/Payments/Payments";
import Housekeeping from "./pages/Housekeeping/Housekeeping";
import Guest from "./pages/Guests/Guest";
import Services from "./pages/Services/Services";
import Config from "./pages/Config/Config";



import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
       
         {
        icon: <TableCellsIcon {...icon} />,
        name: "Rooms",
        path: "/Rooms",
        element: <Rooms />,
      },
         {
        icon: <TableCellsIcon {...icon} />,
        name: "Guests",
        path: "/Guest",
        element: <Guest />,
      },
         {
        icon: <TableCellsIcon {...icon} />,
        name: "Bookings",
        path: "/Bookings",
        element: <Bookings />,
      },
         {
        icon: <TableCellsIcon {...icon} />,
        name: "Payments",
        path: "/Payments",
        element: <Payments />,
      },
         {
        icon: <TableCellsIcon {...icon} />,
        name: "Services",
        path: "/Services",
        element: <Services />,
      },
         {
        icon: <TableCellsIcon {...icon} />,
        name: "HouseKeeping",
        path: "/Housekeeping",
        element: <Housekeeping />,
      },
        {
        icon: <TableCellsIcon {...icon} />,
        name: "System Config",
        path: "/Config",
        element: <Config />,
      },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
    ],
  },

];

export default routes;

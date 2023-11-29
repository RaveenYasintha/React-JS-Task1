import ViewCustomer from "../../pages/ViewCustomer/ViewCustomer.jsx";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";

const Routess = [
  {
    name: "view customer",
    key: "view-customer",
    component: <ViewCustomer />,
    path: "/view-customer",
    icon: " <InboxIcon/>",
  },
  {
    name: "Edit Customer",
    key: "edit-customer",
    component: <ViewCustomer />,
    path: "/edit-customer",
    icon: " <InboxIcon/>",
  },
];

export default Routess;

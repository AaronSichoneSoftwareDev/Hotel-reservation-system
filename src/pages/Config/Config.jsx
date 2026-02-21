import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, CalendarIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Select,
  Option,
} from "@material-tailwind/react";
 
const TABS = [
  {
    label: "All Reservations",
    value: "all",
  },
  {
    label: "Confirmed",
    value: "confirmed",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Checked In",
    value: "checked-in",
  },
  {
    label: "Checked Out",
    value: "checked-out",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
];
 
const TABLE_HEAD = ["Guest", "Reservation Details", "Room", "Status", "Payment", "Check In/Out", "Actions"];
 
const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@email.com",
    phone: "+1 234-567-8901",
    reservationId: "RES-2024-001",
    roomType: "Deluxe Ocean View",
    roomNumber: "1205",
    status: "confirmed",
    paymentStatus: "paid",
    checkIn: "2024-02-15",
    checkOut: "2024-02-20",
    guests: 2,
    totalAmount: "$1,250",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    phone: "+1 234-567-8902",
    reservationId: "RES-2024-002",
    roomType: "Executive Suite",
    roomNumber: "1501",
    status: "checked-in",
    paymentStatus: "paid",
    checkIn: "2024-02-10",
    checkOut: "2024-02-17",
    guests: 3,
    totalAmount: "$2,800",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Robert Chen",
    email: "robert@email.com",
    phone: "+1 234-567-8903",
    reservationId: "RES-2024-003",
    roomType: "Standard Room",
    roomNumber: "804",
    status: "pending",
    paymentStatus: "pending",
    checkIn: "2024-02-18",
    checkOut: "2024-02-22",
    guests: 1,
    totalAmount: "$680",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Maria Garcia",
    email: "maria@email.com",
    phone: "+1 234-567-8904",
    reservationId: "RES-2024-004",
    roomType: "Family Suite",
    roomNumber: "1002",
    status: "checked-out",
    paymentStatus: "paid",
    checkIn: "2024-02-05",
    checkOut: "2024-02-09",
    guests: 4,
    totalAmount: "$1,920",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "David Williams",
    email: "david@email.com",
    phone: "+1 234-567-8905",
    reservationId: "RES-2024-005",
    roomType: "Deluxe Room",
    roomNumber: "1103",
    status: "cancelled",
    paymentStatus: "refunded",
    checkIn: "2024-02-12",
    checkOut: "2024-02-15",
    guests: 2,
    totalAmount: "$840",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Emily Brown",
    email: "emily@email.com",
    phone: "+1 234-567-8906",
    reservationId: "RES-2024-006",
    roomType: "Presidential Suite",
    roomNumber: "1805",
    status: "confirmed",
    paymentStatus: "deposit",
    checkIn: "2024-02-20",
    checkOut: "2024-02-25",
    guests: 2,
    totalAmount: "$3,500",
  },
];
 
const getStatusColor = (status) => {
  switch(status) {
    case "confirmed":
      return "green";
    case "pending":
      return "orange";
    case "checked-in":
      return "blue";
    case "checked-out":
      return "gray";
    case "cancelled":
      return "red";
    default:
      return "gray";
  }
};

const getPaymentStatusColor = (paymentStatus) => {
  switch(paymentStatus) {
    case "paid":
      return "green";
    case "pending":
      return "orange";
    case "deposit":
      return "blue";
    case "refunded":
      return "gray";
    default:
      return "gray";
  }
};

const getStatusLabel = (status) => {
  switch(status) {
    case "confirmed":
      return "Confirmed";
    case "pending":
      return "Pending";
    case "checked-in":
      return "Checked In";
    case "checked-out":
      return "Checked Out";
    case "cancelled":
      return "Cancelled";
    default:
      return status;
  }
};

export function ReservationManagement() {
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Reservation Management System
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Manage hotel bookings, guest information, and room assignments
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" /> Calendar View
            </Button>
            <Button variant="outlined" size="sm">
              Export Report
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> New Reservation
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="flex w-full gap-4 md:w-96">
            <div className="w-full">
              <Input
                label="Search by guest, email, or reservation ID"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Select label="Room Type" className="w-40">
              <Option value="all">All Types</Option>
              <Option value="standard">Standard</Option>
              <Option value="deluxe">Deluxe</Option>
              <Option value="suite">Suite</Option>
              <Option value="family">Family Suite</Option>
              <Option value="presidential">Presidential</Option>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              ({ img, name, email, phone, reservationId, roomType, roomNumber, status, paymentStatus, checkIn, checkOut, guests, totalAmount }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={reservationId}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70 text-xs"
                          >
                            {phone}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          ID: {reservationId}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {roomType} • {guests} {guests === 1 ? 'guest' : 'guests'}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          Total: {totalAmount}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          Room {roomNumber}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col gap-2">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={getStatusLabel(status)}
                          color={getStatusColor(status)}
                          className="w-max"
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={paymentStatus}
                        color={getPaymentStatusColor(paymentStatus)}
                        className="w-max"
                      />
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          In: {checkIn}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          Out: {checkOut}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-2">
                        <Tooltip content="Check In">
                          <IconButton variant="text" color="green">
                            <CheckCircleIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Check Out">
                          <IconButton variant="text" color="blue">
                            <CalendarIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Cancel Reservation">
                          <IconButton variant="text" color="red">
                            <XCircleIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Edit Details">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <div className="flex items-center gap-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Showing 1 to {TABLE_ROWS.length} of 48 reservations
          </Typography>
          <div className="flex gap-1">
            <Chip variant="ghost" size="sm" value="Confirmed: 2" color="green" />
            <Chip variant="ghost" size="sm" value="Pending: 1" color="orange" />
            <Chip variant="ghost" size="sm" value="Checked In: 1" color="blue" />
            <Chip variant="ghost" size="sm" value="Checked Out: 1" color="gray" />
            <Chip variant="ghost" size="sm" value="Cancelled: 1" color="red" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
export default ReservationManagement;
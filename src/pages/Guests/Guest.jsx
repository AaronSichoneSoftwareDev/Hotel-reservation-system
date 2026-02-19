import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
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
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option
} from "@material-tailwind/react";
import { useState } from "react";
 
const TABS = [
  {
    label: "All Guests",
    value: "all",
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
    label: "Upcoming",
    value: "upcoming",
  },
];
 
const TABLE_HEAD = ["Guest", "Room", "Stay Period", "Status", "Payment", "Actions"];
 
const initialGuests = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@email.com",
    phone: "+1 234 567 890",
    roomNumber: "501",
    roomType: "Deluxe Suite",
    checkIn: "2024-03-15",
    checkOut: "2024-03-20",
    status: "checked-in",
    paymentStatus: "paid",
    specialRequests: "Extra pillows, late checkout",
    id: "G1001",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@email.com",
    phone: "+1 234 567 891",
    roomNumber: "302",
    roomType: "Executive Room",
    checkIn: "2024-03-10",
    checkOut: "2024-03-14",
    status: "checked-out",
    paymentStatus: "paid",
    specialRequests: "Airport pickup",
    id: "G1002",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@email.com",
    phone: "+1 234 567 892",
    roomNumber: "205",
    roomType: "Standard Room",
    checkIn: "2024-03-20",
    checkOut: "2024-03-25",
    status: "upcoming",
    paymentStatus: "pending",
    specialRequests: "High floor, quiet room",
    id: "G1003",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@email.com",
    phone: "+1 234 567 893",
    roomNumber: "1503",
    roomType: "Presidential Suite",
    checkIn: "2024-03-16",
    checkOut: "2024-03-18",
    status: "checked-in",
    paymentStatus: "paid",
    specialRequests: "Champagne welcome, roses",
    id: "G1004",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@email.com",
    phone: "+1 234 567 894",
    roomNumber: "408",
    roomType: "Deluxe Room",
    checkIn: "2024-03-22",
    checkOut: "2024-03-28",
    status: "upcoming",
    paymentStatus: "partial",
    specialRequests: "Extra bed, vegetarian meals",
    id: "G1005",
  },
];

export function Guest() {
  const [guests, setGuests] = useState(initialGuests);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [dialogMode, setDialogMode] = useState("add"); // 'add', 'edit', 'view'

  const handleOpenDialog = (mode, guest = null) => {
    setDialogMode(mode);
    setSelectedGuest(guest);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedGuest(null);
  };

  const handleCheckIn = (guestId) => {
    setGuests(guests.map(guest => 
      guest.id === guestId 
        ? { ...guest, status: "checked-in", checkIn: new Date().toISOString().split('T')[0] }
        : guest
    ));
  };

  const handleCheckOut = (guestId) => {
    setGuests(guests.map(guest => 
      guest.id === guestId 
        ? { ...guest, status: "checked-out", checkOut: new Date().toISOString().split('T')[0] }
        : guest
    ));
  };

  const filteredGuests = guests.filter(guest => {
    // Filter by search term
    const matchesSearch = 
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.roomNumber.includes(searchTerm) ||
      guest.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && guest.status === activeTab;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case "checked-in": return "green";
      case "checked-out": return "blue-gray";
      case "upcoming": return "amber";
      default: return "blue-gray";
    }
  };

  const getPaymentColor = (status) => {
    switch(status) {
      case "paid": return "green";
      case "pending": return "amber";
      case "partial": return "orange";
      default: return "blue-gray";
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Guest Management
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Manage hotel guests, check-ins, and reservations
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
                Export List
              </Button>
              <Button 
                className="flex items-center gap-3" 
                size="sm"
                onClick={() => handleOpenDialog("add")}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Guest
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value={activeTab} className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab 
                    key={value} 
                    value={value}
                    onClick={() => setActiveTab(value)}
                  >
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search guests, rooms, or IDs"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
              {filteredGuests.map((guest, index) => {
                const isLast = index === filteredGuests.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={guest.id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={guest.img} alt={guest.name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {guest.name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {guest.email} | {guest.phone}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            ID: {guest.id}
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
                          Room {guest.roomNumber}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {guest.roomType}
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
                          Check-in: {formatDate(guest.checkIn)}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          Check-out: {formatDate(guest.checkOut)}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {Math.ceil((new Date(guest.checkOut) - new Date(guest.checkIn)) / (1000 * 60 * 60 * 24))} nights
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={guest.status.replace('-', ' ')}
                          color={getStatusColor(guest.status)}
                        />
                      </div>
                      {guest.specialRequests && (
                        <Typography
                          variant="small"
                          className="font-normal opacity-70 mt-2"
                        >
                          📝 {guest.specialRequests}
                        </Typography>
                      )}
                    </td>
                    <td className={classes}>
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={guest.paymentStatus}
                        color={getPaymentColor(guest.paymentStatus)}
                      />
                    </td>
                    <td className={classes}>
                      <div className="flex gap-2">
                        {guest.status === "upcoming" && (
                          <Tooltip content="Check In">
                            <IconButton 
                              variant="text" 
                              color="green"
                              onClick={() => handleCheckIn(guest.id)}
                            >
                              <CheckCircleIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {guest.status === "checked-in" && (
                          <Tooltip content="Check Out">
                            <IconButton 
                              variant="text" 
                              color="amber"
                              onClick={() => handleCheckOut(guest.id)}
                            >
                              <XCircleIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip content="Edit Guest">
                          <IconButton 
                            variant="text"
                            onClick={() => handleOpenDialog("edit", guest)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="View Details">
                          <Button
                            variant="text"
                            size="sm"
                            onClick={() => handleOpenDialog("view", guest)}
                          >
                            View
                          </Button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Showing {filteredGuests.length} of {guests.length} guests
          </Typography>
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

      {/* Guest Dialog */}
      <Dialog open={openDialog} handler={handleCloseDialog} size="md">
        <DialogHeader>
          {dialogMode === "add" && "Add New Guest"}
          {dialogMode === "edit" && "Edit Guest Details"}
          {dialogMode === "view" && "Guest Details"}
        </DialogHeader>
        <DialogBody divider>
          <div className="space-y-4">
            {dialogMode === "view" ? (
              // View Mode
              selectedGuest && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar src={selectedGuest.img} alt={selectedGuest.name} size="lg" />
                    <div>
                      <Typography variant="h6">{selectedGuest.name}</Typography>
                      <Typography variant="small" color="gray">ID: {selectedGuest.id}</Typography>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Typography variant="small" color="gray">Email</Typography>
                      <Typography>{selectedGuest.email}</Typography>
                    </div>
                    <div>
                      <Typography variant="small" color="gray">Phone</Typography>
                      <Typography>{selectedGuest.phone}</Typography>
                    </div>
                    <div>
                      <Typography variant="small" color="gray">Room</Typography>
                      <Typography>{selectedGuest.roomNumber} - {selectedGuest.roomType}</Typography>
                    </div>
                    <div>
                      <Typography variant="small" color="gray">Stay Period</Typography>
                      <Typography>{formatDate(selectedGuest.checkIn)} to {formatDate(selectedGuest.checkOut)}</Typography>
                    </div>
                    <div>
                      <Typography variant="small" color="gray">Status</Typography>
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={selectedGuest.status}
                        color={getStatusColor(selectedGuest.status)}
                      />
                    </div>
                    <div>
                      <Typography variant="small" color="gray">Payment</Typography>
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={selectedGuest.paymentStatus}
                        color={getPaymentColor(selectedGuest.paymentStatus)}
                      />
                    </div>
                  </div>
                  {selectedGuest.specialRequests && (
                    <div>
                      <Typography variant="small" color="gray">Special Requests</Typography>
                      <Typography>{selectedGuest.specialRequests}</Typography>
                    </div>
                  )}
                </div>
              )
            ) : (
              // Add/Edit Mode
              <div className="grid grid-cols-2 gap-4">
                <Input label="Full Name" defaultValue={selectedGuest?.name} />
                <Input label="Email" type="email" defaultValue={selectedGuest?.email} />
                <Input label="Phone" defaultValue={selectedGuest?.phone} />
                <Input label="Room Number" defaultValue={selectedGuest?.roomNumber} />
                <Select label="Room Type" value={selectedGuest?.roomType}>
                  <Option value="Standard Room">Standard Room</Option>
                  <Option value="Deluxe Room">Deluxe Room</Option>
                  <Option value="Executive Room">Executive Room</Option>
                  <Option value="Deluxe Suite">Deluxe Suite</Option>
                  <Option value="Presidential Suite">Presidential Suite</Option>
                </Select>
                <Input label="Check-in Date" type="date" defaultValue={selectedGuest?.checkIn} />
                <Input label="Check-out Date" type="date" defaultValue={selectedGuest?.checkOut} />
                <Select label="Status" value={selectedGuest?.status}>
                  <Option value="upcoming">Upcoming</Option>
                  <Option value="checked-in">Checked In</Option>
                  <Option value="checked-out">Checked Out</Option>
                </Select>
                <Select label="Payment Status" value={selectedGuest?.paymentStatus}>
                  <Option value="paid">Paid</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="partial">Partial</Option>
                </Select>
                <div className="col-span-2">
                  <Input label="Special Requests" defaultValue={selectedGuest?.specialRequests} />
                </div>
              </div>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCloseDialog}
            className="mr-1"
          >
            {dialogMode === "view" ? "Close" : "Cancel"}
          </Button>
          {dialogMode !== "view" && (
            <Button variant="gradient" color="green" onClick={handleCloseDialog}>
              {dialogMode === "add" ? "Add Guest" : "Save Changes"}
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Guest;
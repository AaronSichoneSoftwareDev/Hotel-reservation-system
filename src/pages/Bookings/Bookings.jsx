import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, CheckCircleIcon, XCircleIcon, CalendarIcon, CurrencyDollarIcon, HomeModernIcon } from "@heroicons/react/24/solid";
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
  Option,
  Textarea
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
 
const TABS = [
  {
    label: "All Bookings",
    value: "all",
  },
  {
    label: "Confirmed",
    value: "confirmed",
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

const ROOM_TYPES = [
  { value: "standard", label: "Standard Room", price: 100, capacity: 2 },
  { value: "deluxe", label: "Deluxe Room", price: 150, capacity: 2 },
  { value: "executive", label: "Executive Room", price: 200, capacity: 3 },
  { value: "suite", label: "Deluxe Suite", price: 300, capacity: 4 },
  { value: "presidential", label: "Presidential Suite", price: 500, capacity: 6 },
];

const PAYMENT_METHODS = [
  "Credit Card",
  "Debit Card",
  "Cash",
  "Bank Transfer",
  "Online Payment"
];

const TABLE_HEAD = ["Booking ID", "Guest Info", "Room Details", "Stay Period", "Status", "Payment", "Actions"];

const initialBookings = [
  {
    id: "BKG1001",
    guestId: "G1001",
    guestName: "John Michael",
    guestEmail: "john@email.com",
    guestPhone: "+1 234 567 890",
    guestImage: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    roomNumber: "501",
    roomType: "suite",
    adults: 2,
    children: 1,
    checkIn: "2024-03-15",
    checkOut: "2024-03-20",
    status: "checked-in",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    totalAmount: 1500,
    specialRequests: "Extra pillows, late checkout",
    bookingDate: "2024-02-10",
    nights: 5,
  },
  {
    id: "BKG1002",
    guestId: "G1002",
    guestName: "Alexa Liras",
    guestEmail: "alexa@email.com",
    guestPhone: "+1 234 567 891",
    guestImage: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    roomNumber: "302",
    roomType: "executive",
    adults: 1,
    children: 0,
    checkIn: "2024-03-10",
    checkOut: "2024-03-14",
    status: "checked-out",
    paymentStatus: "paid",
    paymentMethod: "Cash",
    totalAmount: 800,
    specialRequests: "Airport pickup",
    bookingDate: "2024-02-15",
    nights: 4,
  },
  {
    id: "BKG1003",
    guestId: "G1003",
    guestName: "Laurent Perrier",
    guestEmail: "laurent@email.com",
    guestPhone: "+1 234 567 892",
    guestImage: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    roomNumber: "205",
    roomType: "standard",
    adults: 2,
    children: 0,
    checkIn: "2024-03-20",
    checkOut: "2024-03-25",
    status: "confirmed",
    paymentStatus: "pending",
    paymentMethod: "Bank Transfer",
    totalAmount: 500,
    specialRequests: "High floor, quiet room",
    bookingDate: "2024-03-01",
    nights: 5,
  },
  {
    id: "BKG1004",
    guestId: "G1004",
    guestName: "Michael Levi",
    guestEmail: "michael@email.com",
    guestPhone: "+1 234 567 893",
    guestImage: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    roomNumber: "1503",
    roomType: "presidential",
    adults: 2,
    children: 2,
    checkIn: "2024-03-16",
    checkOut: "2024-03-18",
    status: "checked-in",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    totalAmount: 1000,
    specialRequests: "Champagne welcome, roses",
    bookingDate: "2024-02-20",
    nights: 2,
  },
  {
    id: "BKG1005",
    guestId: "G1005",
    guestName: "Richard Gran",
    guestEmail: "richard@email.com",
    guestPhone: "+1 234 567 894",
    guestImage: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    roomNumber: "408",
    roomType: "deluxe",
    adults: 3,
    children: 1,
    checkIn: "2024-03-22",
    checkOut: "2024-03-28",
    status: "confirmed",
    paymentStatus: "partial",
    paymentMethod: "Debit Card",
    totalAmount: 1050,
    paidAmount: 500,
    specialRequests: "Extra bed, vegetarian meals",
    bookingDate: "2024-03-05",
    nights: 6,
  },
];

export function Bookings() {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [dialogMode, setDialogMode] = useState("add"); // 'add', 'edit', 'view'
  const [newBooking, setNewBooking] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    roomType: "standard",
    adults: 1,
    children: 0,
    checkIn: "",
    checkOut: "",
    paymentMethod: "Credit Card",
    specialRequests: "",
  });

  // Calculate nights and total amount
  useEffect(() => {
    if (newBooking.checkIn && newBooking.checkOut) {
      const nights = Math.ceil((new Date(newBooking.checkOut) - new Date(newBooking.checkIn)) / (1000 * 60 * 60 * 24));
      if (nights > 0) {
        const roomPrice = ROOM_TYPES.find(r => r.value === newBooking.roomType)?.price || 0;
        setNewBooking(prev => ({
          ...prev,
          nights: nights,
          totalAmount: nights * roomPrice
        }));
      }
    }
  }, [newBooking.checkIn, newBooking.checkOut, newBooking.roomType]);

  const handleOpenDialog = (mode, booking = null) => {
    setDialogMode(mode);
    setSelectedBooking(booking);
    if (mode === "add") {
      setNewBooking({
        guestName: "",
        guestEmail: "",
        guestPhone: "",
        roomType: "standard",
        adults: 1,
        children: 0,
        checkIn: "",
        checkOut: "",
        paymentMethod: "Credit Card",
        specialRequests: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
  };

  const handleAddBooking = () => {
    const bookingId = `BKG${String(bookings.length + 1006).padStart(4, '0')}`;
    const guestId = `G${String(bookings.length + 1006).padStart(4, '0')}`;
    const roomPrice = ROOM_TYPES.find(r => r.value === newBooking.roomType)?.price || 0;
    
    const booking = {
      id: bookingId,
      guestId: guestId,
      ...newBooking,
      status: "confirmed",
      paymentStatus: "pending",
      totalAmount: newBooking.nights * roomPrice,
      bookingDate: new Date().toISOString().split('T')[0],
      roomNumber: "TBA", // Would be assigned by room management system
      guestImage: "https://via.placeholder.com/150",
    };
    
    setBookings([...bookings, booking]);
    handleCloseDialog();
  };

  const handleUpdateBooking = () => {
    setBookings(bookings.map(booking => 
      booking.id === selectedBooking.id ? selectedBooking : booking
    ));
    handleCloseDialog();
  };

  const handleCheckIn = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: "checked-in", checkIn: new Date().toISOString().split('T')[0] }
        : booking
    ));
  };

  const handleCheckOut = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: "checked-out", checkOut: new Date().toISOString().split('T')[0] }
        : booking
    ));
  };

  const handleCancelBooking = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: "cancelled" }
        : booking
    ));
  };

  const handleProcessPayment = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, paymentStatus: "paid", paidAmount: booking.totalAmount }
        : booking
    ));
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomNumber.includes(searchTerm);
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && booking.status === activeTab;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case "checked-in": return "green";
      case "checked-out": return "blue-gray";
      case "confirmed": return "blue";
      case "cancelled": return "red";
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

  const calculateOccupancy = () => {
    const totalRooms = 50; // Example total rooms
    const checkedIn = bookings.filter(b => b.status === "checked-in").length;
    const occupancyRate = (checkedIn / totalRooms) * 100;
    return occupancyRate.toFixed(1);
  };

  const calculateRevenue = () => {
    const today = new Date().toISOString().split('T')[0];
    return bookings
      .filter(b => b.checkIn === today && b.paymentStatus === "paid")
      .reduce((sum, b) => sum + b.totalAmount, 0);
  };

  return (
    <>
      {/* Stats Cards */}
      <div className="mb-4 grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <Typography variant="small" color="gray" className="flex items-center gap-1">
            <HomeModernIcon className="h-4 w-4" /> Total Bookings
          </Typography>
          <Typography variant="h4">{bookings.length}</Typography>
        </Card>
        <Card className="p-4">
          <Typography variant="small" color="gray" className="flex items-center gap-1">
            <CheckCircleIcon className="h-4 w-4 text-green-500" /> Checked In
          </Typography>
          <Typography variant="h4">{bookings.filter(b => b.status === "checked-in").length}</Typography>
        </Card>
        <Card className="p-4">
          <Typography variant="small" color="gray" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4 text-blue-500" /> Occupancy Rate
          </Typography>
          <Typography variant="h4">{calculateOccupancy()}%</Typography>
        </Card>
        <Card className="p-4">
          <Typography variant="small" color="gray" className="flex items-center gap-1">
            <CurrencyDollarIcon className="h-4 w-4 text-green-500" /> Today's Revenue
          </Typography>
          <Typography variant="h4">${calculateRevenue()}</Typography>
        </Card>
      </div>

      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Hotel Booking Management
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Manage reservations, check-ins, and guest information
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
                Export Report
              </Button>
              <Button 
                className="flex items-center gap-3" 
                size="sm"
                onClick={() => handleOpenDialog("add")}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> New Booking
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
                label="Search by name, email, or booking ID"
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
              {filteredBookings.map((booking, index) => {
                const isLast = index === filteredBookings.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={booking.id}>
                    <td className={classes}>
                      <div>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {booking.id}
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal opacity-70">
                          Booked: {formatDate(booking.bookingDate)}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={booking.guestImage} alt={booking.guestName} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {booking.guestName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {booking.guestEmail}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {booking.guestPhone}
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
                          Room {booking.roomNumber}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {ROOM_TYPES.find(r => r.value === booking.roomType)?.label}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {booking.adults} Adult(s), {booking.children} Child(ren)
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
                          In: {formatDate(booking.checkIn)}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          Out: {formatDate(booking.checkOut)}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {booking.nights} nights
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={booking.status.replace('-', ' ')}
                          color={getStatusColor(booking.status)}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col gap-1">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={booking.paymentStatus}
                          color={getPaymentColor(booking.paymentStatus)}
                        />
                        <Typography variant="small" className="font-normal">
                          ${booking.totalAmount}
                        </Typography>
                        <Typography variant="small" className="font-normal opacity-70">
                          {booking.paymentMethod}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex gap-2">
                        {booking.status === "confirmed" && (
                          <>
                            <Tooltip content="Check In">
                              <IconButton 
                                variant="text" 
                                color="green"
                                onClick={() => handleCheckIn(booking.id)}
                              >
                                <CheckCircleIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Cancel Booking">
                              <IconButton 
                                variant="text" 
                                color="red"
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                <XCircleIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                        {booking.status === "checked-in" && (
                          <Tooltip content="Check Out">
                            <IconButton 
                              variant="text" 
                              color="amber"
                              onClick={() => handleCheckOut(booking.id)}
                            >
                              <XCircleIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {booking.paymentStatus === "pending" && booking.status !== "cancelled" && (
                          <Tooltip content="Process Payment">
                            <IconButton 
                              variant="text" 
                              color="green"
                              onClick={() => handleProcessPayment(booking.id)}
                            >
                              <CurrencyDollarIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip content="Edit Booking">
                          <IconButton 
                            variant="text"
                            onClick={() => handleOpenDialog("edit", booking)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="View Details">
                          <Button
                            variant="text"
                            size="sm"
                            onClick={() => handleOpenDialog("view", booking)}
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
            Showing {filteredBookings.length} of {bookings.length} bookings
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

      {/* Booking Dialog */}
      <Dialog open={openDialog} handler={handleCloseDialog} size={dialogMode === "view" ? "md" : "lg"}>
        <DialogHeader>
          {dialogMode === "add" && "New Booking"}
          {dialogMode === "edit" && "Edit Booking"}
          {dialogMode === "view" && "Booking Details"}
        </DialogHeader>
        <DialogBody divider className="max-h-[70vh] overflow-scroll">
          <div className="space-y-4">
            {dialogMode === "view" && selectedBooking ? (
              // View Mode
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar src={selectedBooking.guestImage} alt={selectedBooking.guestName} size="lg" />
                  <div>
                    <Typography variant="h6">{selectedBooking.guestName}</Typography>
                    <Typography variant="small" color="gray">Booking ID: {selectedBooking.id}</Typography>
                    <Typography variant="small" color="gray">Guest ID: {selectedBooking.guestId}</Typography>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Typography variant="small" color="gray">Contact Information</Typography>
                    <Typography>{selectedBooking.guestEmail}</Typography>
                    <Typography>{selectedBooking.guestPhone}</Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="gray">Booking Date</Typography>
                    <Typography>{formatDate(selectedBooking.bookingDate)}</Typography>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Typography variant="h6" color="blue-gray">Room Details</Typography>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Typography variant="small" color="gray">Room Number</Typography>
                      <Typography>{selectedBooking.roomNumber}</Typography>
                    </div>
                    <div>
                      <Typography variant="small" color="gray">Room Type</Typography>
                      <Typography>{ROOM_TYPES.find(r => r.value === selectedBooking.roomType)?.label}</Typography>
                    </div>
                    <div>
                      <Typography variant="small" color="gray">Guests</Typography>
                      <Typography>{selectedBooking.adults} Adults, {selectedBooking.children} Children</Typography>
                    </div>
                    <div>
                      <Typography variant="small" color="gray">Nights</Typography>
                      <Typography>{selectedBooking.nights}</Typography>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Typography variant="h6" color="blue-gray">Stay Period</Typography>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Typography variant="small" color="gray">Check In</Typography>
                      <Typography>{formatDate(selectedBooking.checkIn)}</Typography>
                    </div>
                    <div>
                      <Typography variant="small" color="gray">Check Out</Typography>
                      <Typography>{formatDate(selectedBooking.checkOut)}</Typography>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Typography variant="h6" color="blue-gray">Payment Information</Typography>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Typography variant="small" color="gray">Status</Typography>
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={selectedBooking.paymentStatus}
                        color={getPaymentColor(selectedBooking.paymentStatus)}
                      />
                    </div>
                    <div>
                      <Typography variant="small" color="gray">Method</Typography>
                      <Typography>{selectedBooking.paymentMethod}</Typography>
                    </div>
                    <div>
                      <Typography variant="small" color="gray">Total Amount</Typography>
                      <Typography className="font-bold">${selectedBooking.totalAmount}</Typography>
                    </div>
                    {selectedBooking.paidAmount && (
                      <div>
                        <Typography variant="small" color="gray">Paid Amount</Typography>
                        <Typography>${selectedBooking.paidAmount}</Typography>
                      </div>
                    )}
                  </div>
                </div>

                {selectedBooking.specialRequests && (
                  <div className="border-t pt-4">
                    <Typography variant="h6" color="blue-gray">Special Requests</Typography>
                    <Typography className="mt-2">{selectedBooking.specialRequests}</Typography>
                  </div>
                )}
              </div>
            ) : (
              // Add/Edit Mode
              <div className="space-y-6">
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-4">Guest Information</Typography>
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      label="Full Name" 
                      value={dialogMode === "edit" ? selectedBooking?.guestName : newBooking.guestName}
                      onChange={(e) => setNewBooking({...newBooking, guestName: e.target.value})}
                    />
                    <Input 
                      label="Email" 
                      type="email"
                      value={dialogMode === "edit" ? selectedBooking?.guestEmail : newBooking.guestEmail}
                      onChange={(e) => setNewBooking({...newBooking, guestEmail: e.target.value})}
                    />
                    <Input 
                      label="Phone" 
                      value={dialogMode === "edit" ? selectedBooking?.guestPhone : newBooking.guestPhone}
                      onChange={(e) => setNewBooking({...newBooking, guestPhone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Typography variant="h6" color="blue-gray" className="mb-4">Booking Details</Typography>
                  <div className="grid grid-cols-2 gap-4">
                    <Select 
                      label="Room Type"
                      value={dialogMode === "edit" ? selectedBooking?.roomType : newBooking.roomType}
                      onChange={(val) => setNewBooking({...newBooking, roomType: val})}
                    >
                      {ROOM_TYPES.map(room => (
                        <Option key={room.value} value={room.value}>
                          {room.label} - ${room.price}/night
                        </Option>
                      ))}
                    </Select>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        label="Adults" 
                        type="number"
                        min="1"
                        max="4"
                        value={dialogMode === "edit" ? selectedBooking?.adults : newBooking.adults}
                        onChange={(e) => setNewBooking({...newBooking, adults: parseInt(e.target.value)})}
                      />
                      <Input 
                        label="Children" 
                        type="number"
                        min="0"
                        max="4"
                        value={dialogMode === "edit" ? selectedBooking?.children : newBooking.children}
                        onChange={(e) => setNewBooking({...newBooking, children: parseInt(e.target.value)})}
                      />
                    </div>
                    
                    <Input 
                      label="Check-in Date" 
                      type="date"
                      value={dialogMode === "edit" ? selectedBooking?.checkIn : newBooking.checkIn}
                      onChange={(e) => setNewBooking({...newBooking, checkIn: e.target.value})}
                    />
                    <Input 
                      label="Check-out Date" 
                      type="date"
                      value={dialogMode === "edit" ? selectedBooking?.checkOut : newBooking.checkOut}
                      onChange={(e) => setNewBooking({...newBooking, checkOut: e.target.value})}
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Typography variant="h6" color="blue-gray" className="mb-4">Payment Information</Typography>
                  <div className="grid grid-cols-2 gap-4">
                    <Select 
                      label="Payment Method"
                      value={dialogMode === "edit" ? selectedBooking?.paymentMethod : newBooking.paymentMethod}
                      onChange={(val) => setNewBooking({...newBooking, paymentMethod: val})}
                    >
                      {PAYMENT_METHODS.map(method => (
                        <Option key={method} value={method}>{method}</Option>
                      ))}
                    </Select>
                    
                    {dialogMode === "edit" && (
                      <Select 
                        label="Payment Status"
                        value={selectedBooking?.paymentStatus}
                        onChange={(val) => setSelectedBooking({...selectedBooking, paymentStatus: val})}
                      >
                        <Option value="pending">Pending</Option>
                        <Option value="partial">Partial</Option>
                        <Option value="paid">Paid</Option>
                      </Select>
                    )}
                  </div>
                  
                  {newBooking.nights > 0 && (
                    <div className="mt-4 p-4 bg-blue-gray-50 rounded-lg">
                      <Typography variant="small" color="gray">Price Summary</Typography>
                      <Typography variant="h5" color="blue-gray">
                        Total: ${newBooking.nights * (ROOM_TYPES.find(r => r.value === newBooking.roomType)?.price || 0)}
                      </Typography>
                      <Typography variant="small" color="gray">
                        {newBooking.nights} nights × ${ROOM_TYPES.find(r => r.value === newBooking.roomType)?.price}/night
                      </Typography>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <Textarea 
                    label="Special Requests"
                    value={dialogMode === "edit" ? selectedBooking?.specialRequests : newBooking.specialRequests}
                    onChange={(e) => setNewBooking({...newBooking, specialRequests: e.target.value})}
                  />
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
            <Button 
              variant="gradient" 
              color="green" 
              onClick={dialogMode === "add" ? handleAddBooking : handleUpdateBooking}
            >
              {dialogMode === "add" ? "Create Booking" : "Save Changes"}
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Bookings;
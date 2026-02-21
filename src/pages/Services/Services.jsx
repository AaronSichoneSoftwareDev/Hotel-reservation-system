import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  PencilIcon,
  UserPlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  CakeIcon,
  WifiIcon,
  SparklesIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  PrinterIcon,
  PlusIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
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
  Textarea,
  Alert,
  Radio,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";

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

const SERVICE_TABS = [
  {
    label: "All Services",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "In Progress",
    value: "in-progress",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
];

const TABLE_HEAD = ["Guest", "Room", "Stay Period", "Status", "Services", "Actions"];

// Available hotel services with pricing
const AVAILABLE_SERVICES = [
  {
    id: "S001",
    name: "Room Service - Breakfast",
    category: "dining",
    price: 25.00,
    icon: "🍳",
    description: "Continental breakfast delivered to room",
  },
  {
    id: "S002",
    name: "Room Service - Dinner",
    category: "dining",
    price: 45.00,
    icon: "🍽️",
    description: "Full course dinner in room",
  },
  {
    id: "S003",
    name: "Spa Treatment - Massage",
    category: "wellness",
    price: 120.00,
    icon: "💆",
    description: "60-minute relaxing massage",
  },
  {
    id: "S004",
    name: "Spa Treatment - Facial",
    category: "wellness",
    price: 95.00,
    icon: "✨",
    description: "Deluxe facial treatment",
  },
  {
    id: "S005",
    name: "Laundry Service",
    category: "housekeeping",
    price: 35.00,
    icon: "👕",
    description: "Same-day laundry service",
  },
  {
    id: "S006",
    name: "Dry Cleaning",
    category: "housekeeping",
    price: 50.00,
    icon: "👔",
    description: "Professional dry cleaning",
  },
  {
    id: "S007",
    name: "Airport Transfer",
    category: "transport",
    price: 75.00,
    icon: "🚗",
    description: "Luxury car airport transfer",
  },
  {
    id: "S008",
    name: "Car Rental",
    category: "transport",
    price: 150.00,
    icon: "🚙",
    description: "24-hour car rental",
  },
  {
    id: "S009",
    name: "Gym Access",
    category: "wellness",
    price: 20.00,
    icon: "💪",
    description: "Daily gym and fitness center access",
  },
  {
    id: "S010",
    name: "Pool Access",
    category: "wellness",
    price: 15.00,
    icon: "🏊",
    description: "Swimming pool access",
  },
  {
    id: "S011",
    name: "Movie Rental",
    category: "entertainment",
    price: 12.00,
    icon: "🎬",
    description: "Premium movie rental",
  },
  {
    id: "S012",
    name: "Mini Bar Restock",
    category: "dining",
    price: 40.00,
    icon: "🥤",
    description: "Mini bar restock service",
  },
  {
    id: "S013",
    name: "Birthday Cake",
    category: "special",
    price: 35.00,
    icon: "🎂",
    description: "Special occasion cake",
  },
  {
    id: "S014",
    name: "Flower Delivery",
    category: "special",
    price: 45.00,
    icon: "💐",
    description: "Fresh flower arrangement",
  },
  {
    id: "S015",
    name: "Extra Bed",
    category: "room",
    price: 50.00,
    icon: "🛏️",
    description: "Additional bed for room",
  },
];

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
    services: [
      {
        id: "SRV001",
        serviceId: "S005",
        name: "Laundry Service",
        quantity: 2,
        price: 35.00,
        total: 70.00,
        status: "completed",
        requestedDate: "2024-03-16",
        completedDate: "2024-03-16",
        notes: "3 shirts, 2 pants",
      },
      {
        id: "SRV002",
        serviceId: "S013",
        name: "Birthday Cake",
        quantity: 1,
        price: 35.00,
        total: 35.00,
        status: "completed",
        requestedDate: "2024-03-17",
        completedDate: "2024-03-17",
        notes: "Chocolate cake with happy birthday message",
      },
    ],
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
    services: [
      {
        id: "SRV003",
        serviceId: "S007",
        name: "Airport Transfer",
        quantity: 2,
        price: 75.00,
        total: 150.00,
        status: "completed",
        requestedDate: "2024-03-09",
        completedDate: "2024-03-14",
        notes: "Pickup and dropoff",
      },
    ],
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
    services: [],
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
    services: [
      {
        id: "SRV004",
        serviceId: "S003",
        name: "Spa Treatment - Massage",
        quantity: 2,
        price: 120.00,
        total: 240.00,
        status: "in-progress",
        requestedDate: "2024-03-16",
        scheduledTime: "15:00",
        notes: "Couples massage",
      },
      {
        id: "SRV005",
        serviceId: "S014",
        name: "Flower Delivery",
        quantity: 1,
        price: 45.00,
        total: 45.00,
        status: "pending",
        requestedDate: "2024-03-16",
        notes: "Roses arrangement",
      },
    ],
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
    services: [],
  },
];

export function Services() {
  const [guests, setGuests] = useState(initialGuests);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [serviceTab, setServiceTab] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [openServiceDialog, setOpenServiceDialog] = useState(false);
  const [openServiceHistoryDialog, setOpenServiceHistoryDialog] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [dialogMode, setDialogMode] = useState("add");
  const [serviceData, setServiceData] = useState({
    serviceId: "",
    quantity: 1,
    scheduledTime: "",
    notes: "",
  });
  const [alertMessage, setAlertMessage] = useState(null);

  // Service statistics
  const serviceStats = {
    totalServices: guests.reduce((sum, guest) => sum + guest.services.length, 0),
    pendingServices: guests.reduce((sum, guest) => 
      sum + guest.services.filter(s => s.status === "pending").length, 0),
    inProgressServices: guests.reduce((sum, guest) => 
      sum + guest.services.filter(s => s.status === "in-progress").length, 0),
    completedServices: guests.reduce((sum, guest) => 
      sum + guest.services.filter(s => s.status === "completed").length, 0),
    totalServiceRevenue: guests.reduce((sum, guest) => 
      sum + guest.services.reduce((s, service) => s + service.total, 0), 0),
  };

  const handleOpenDialog = (mode, guest = null) => {
    setDialogMode(mode);
    setSelectedGuest(guest);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedGuest(null);
  };

  const handleOpenServiceDialog = (guest) => {
    setSelectedGuest(guest);
    setServiceData({
      serviceId: "",
      quantity: 1,
      scheduledTime: "",
      notes: "",
    });
    setOpenServiceDialog(true);
  };

  const handleCloseServiceDialog = () => {
    setOpenServiceDialog(false);
    setSelectedGuest(null);
    setServiceData({
      serviceId: "",
      quantity: 1,
      scheduledTime: "",
      notes: "",
    });
  };

  const handleOpenServiceHistoryDialog = (guest) => {
    setSelectedGuest(guest);
    setOpenServiceHistoryDialog(true);
  };

  const handleCloseServiceHistoryDialog = () => {
    setOpenServiceHistoryDialog(false);
    setSelectedGuest(null);
  };

  const addService = () => {
    if (!selectedGuest || !serviceData.serviceId) {
      setAlertMessage({ type: "error", text: "Please select a service" });
      return;
    }

    const selectedServiceDetails = AVAILABLE_SERVICES.find(s => s.id === serviceData.serviceId);
    const quantity = parseInt(serviceData.quantity) || 1;
    const total = selectedServiceDetails.price * quantity;

    const newService = {
      id: `SRV${String(selectedGuest.services.length + 1).padStart(3, '0')}`,
      serviceId: serviceData.serviceId,
      name: selectedServiceDetails.name,
      quantity: quantity,
      price: selectedServiceDetails.price,
      total: total,
      status: "pending",
      requestedDate: new Date().toISOString().split('T')[0],
      scheduledTime: serviceData.scheduledTime,
      notes: serviceData.notes,
    };

    setGuests(guests.map(guest =>
      guest.id === selectedGuest.id
        ? { ...guest, services: [...guest.services, newService] }
        : guest
    ));

    setAlertMessage({ 
      type: "success", 
      text: `${selectedServiceDetails.name} added successfully!` 
    });
    
    setTimeout(() => setAlertMessage(null), 3000);
    handleCloseServiceDialog();
  };

  const updateServiceStatus = (guestId, serviceId, newStatus) => {
    setGuests(guests.map(guest => {
      if (guest.id === guestId) {
        const updatedServices = guest.services.map(service => {
          if (service.id === serviceId) {
            return {
              ...service,
              status: newStatus,
              completedDate: newStatus === "completed" ? new Date().toISOString().split('T')[0] : service.completedDate,
            };
          }
          return service;
        });
        return { ...guest, services: updatedServices };
      }
      return guest;
    }));

    setAlertMessage({ 
      type: "success", 
      text: `Service status updated to ${newStatus}` 
    });
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const handleCheckIn = (guestId) => {
    setGuests(guests.map(guest => 
      guest.id === guestId 
        ? { ...guest, status: "checked-in", checkIn: new Date().toISOString().split('T')[0] }
        : guest
    ));
    setAlertMessage({ type: "info", text: "Guest checked in successfully!" });
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const handleCheckOut = (guestId) => {
    const guest = guests.find(g => g.id === guestId);
    const pendingServices = guest.services.filter(s => s.status === "pending" || s.status === "in-progress");
    
    if (pendingServices.length > 0) {
      setAlertMessage({ 
        type: "warning", 
        text: "Cannot checkout. Guest has pending services." 
      });
      return;
    }
    
    setGuests(guests.map(guest => 
      guest.id === guestId 
        ? { ...guest, status: "checked-out", checkOut: new Date().toISOString().split('T')[0] }
        : guest
    ));
    setAlertMessage({ type: "info", text: "Guest checked out successfully!" });
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = 
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.roomNumber.includes(searchTerm) ||
      guest.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && guest.status === activeTab;
  });

  const getFilteredServices = () => {
    if (serviceTab === "all") return null;
    return guests.filter(guest => 
      guest.services.some(service => service.status === serviceTab)
    );
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "checked-in": return "green";
      case "checked-out": return "blue-gray";
      case "upcoming": return "amber";
      default: return "blue-gray";
    }
  };

  const getServiceStatusColor = (status) => {
    switch(status) {
      case "pending": return "amber";
      case "in-progress": return "blue";
      case "completed": return "green";
      case "cancelled": return "red";
      default: return "blue-gray";
    }
  };

  const getServiceCategoryIcon = (category) => {
    switch(category) {
      case "dining": return "🍽️";
      case "wellness": return "💆";
      case "housekeeping": return "🧹";
      case "transport": return "🚗";
      case "entertainment": return "🎬";
      case "special": return "✨";
      default: return "📦";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <>
      {/* Alert Message */}
      {alertMessage && (
        <div className="fixed top-4 right-4 z-50 w-96">
          <Alert
            color={alertMessage.type === "success" ? "green" : alertMessage.type === "error" ? "red" : "blue"}
            onClose={() => setAlertMessage(null)}
          >
            {alertMessage.text}
          </Alert>
        </div>
      )}

      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Hotel Services Management
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Manage guest services, requests, and amenities
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm" className="flex items-center gap-2">
                <DocumentTextIcon className="h-4 w-4" /> Service Report
              </Button>
              <Button 
                className="flex items-center gap-3" 
                size="sm"
                onClick={() => handleOpenDialog("add")}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> New Guest
              </Button>
            </div>
          </div>

          {/* Service Summary Cards */}
          <div className="mb-6 grid gap-4 md:grid-cols-5">
            <Card className="p-4">
              <Typography variant="small" color="gray">Total Services</Typography>
              <Typography variant="h5" color="blue-gray">{serviceStats.totalServices}</Typography>
            </Card>
            <Card className="p-4">
              <Typography variant="small" color="gray">Pending</Typography>
              <Typography variant="h5" color="amber">{serviceStats.pendingServices}</Typography>
            </Card>
            <Card className="p-4">
              <Typography variant="small" color="gray">In Progress</Typography>
              <Typography variant="h5" color="blue">{serviceStats.inProgressServices}</Typography>
            </Card>
            <Card className="p-4">
              <Typography variant="small" color="gray">Completed</Typography>
              <Typography variant="h5" color="green">{serviceStats.completedServices}</Typography>
            </Card>
            <Card className="p-4">
              <Typography variant="small" color="gray">Service Revenue</Typography>
              <Typography variant="h5" color="green">{formatCurrency(serviceStats.totalServiceRevenue)}</Typography>
            </Card>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <Tabs value={activeTab} className="w-full md:w-max">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab 
                      key={value} 
                      value={value}
                      onClick={() => setActiveTab(value)}
                    >
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
              <Tabs value={serviceTab} className="w-full md:w-max">
                <TabsHeader>
                  {SERVICE_TABS.map(({ label, value }) => (
                    <Tab 
                      key={value} 
                      value={value}
                      onClick={() => setServiceTab(value)}
                    >
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
            </div>
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
              {(serviceTab === "all" ? filteredGuests : getFilteredServices()).map((guest, index) => {
                const isLast = index === filteredGuests.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                const displayedServices = serviceTab === "all" 
                  ? guest.services 
                  : guest.services.filter(s => s.status === serviceTab);
 
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
                      <div className="space-y-2">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={guest.status.replace('-', ' ')}
                          color={getStatusColor(guest.status)}
                        />
                        {guest.specialRequests && (
                          <Tooltip content={guest.specialRequests}>
                            <Typography
                              variant="small"
                              className="font-normal opacity-70 cursor-help"
                            >
                              📝 Special requests
                            </Typography>
                          </Tooltip>
                        )}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="space-y-3 max-w-xs">
                        {displayedServices.length > 0 ? (
                          displayedServices.map((service) => (
                            <div key={service.id} className="border rounded-lg p-2 bg-gray-50">
                              <div className="flex justify-between items-start">
                                <div>
                                  <Typography variant="small" className="font-bold">
                                    {service.name}
                                  </Typography>
                                  <Typography variant="small" className="opacity-70">
                                    Qty: {service.quantity} | {formatCurrency(service.total)}
                                  </Typography>
                                  {service.scheduledTime && (
                                    <Typography variant="small" className="opacity-70">
                                      🕐 {service.scheduledTime}
                                    </Typography>
                                  )}
                                </div>
                                <Chip
                                  variant="ghost"
                                  size="sm"
                                  value={service.status}
                                  color={getServiceStatusColor(service.status)}
                                />
                              </div>
                              {service.notes && (
                                <Typography variant="small" className="mt-1 opacity-70">
                                  Note: {service.notes}
                                </Typography>
                              )}
                              <div className="flex gap-1 mt-2 justify-end">
                                {service.status === "pending" && (
                                  <>
                                    <Tooltip content="Start Service">
                                      <IconButton 
                                        size="sm"
                                        variant="text" 
                                        color="blue"
                                        onClick={() => updateServiceStatus(guest.id, service.id, "in-progress")}
                                      >
                                        <ClockIcon className="h-3 w-3" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip content="Complete">
                                      <IconButton 
                                        size="sm"
                                        variant="text" 
                                        color="green"
                                        onClick={() => updateServiceStatus(guest.id, service.id, "completed")}
                                      >
                                        <CheckCircleIcon className="h-3 w-3" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip content="Cancel">
                                      <IconButton 
                                        size="sm"
                                        variant="text" 
                                        color="red"
                                        onClick={() => updateServiceStatus(guest.id, service.id, "cancelled")}
                                      >
                                        <XCircleIcon className="h-3 w-3" />
                                      </IconButton>
                                    </Tooltip>
                                  </>
                                )}
                                {service.status === "in-progress" && (
                                  <>
                                    <Tooltip content="Complete">
                                      <IconButton 
                                        size="sm"
                                        variant="text" 
                                        color="green"
                                        onClick={() => updateServiceStatus(guest.id, service.id, "completed")}
                                      >
                                        <CheckCircleIcon className="h-3 w-3" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip content="Cancel">
                                      <IconButton 
                                        size="sm"
                                        variant="text" 
                                        color="red"
                                        onClick={() => updateServiceStatus(guest.id, service.id, "cancelled")}
                                      >
                                        <XCircleIcon className="h-3 w-3" />
                                      </IconButton>
                                    </Tooltip>
                                  </>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <Typography variant="small" className="opacity-70 italic">
                            No services requested
                          </Typography>
                        )}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col gap-2">
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
                          <Tooltip content="Add Service">
                            <IconButton 
                              variant="text" 
                              color="green"
                              onClick={() => handleOpenServiceDialog(guest)}
                              disabled={guest.status !== "checked-in"}
                            >
                              <PlusIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="View All Services">
                            <IconButton 
                              variant="text" 
                              color="blue"
                              onClick={() => handleOpenServiceHistoryDialog(guest)}
                            >
                              <ShoppingBagIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Edit Guest">
                            <IconButton 
                              variant="text"
                              onClick={() => handleOpenDialog("edit", guest)}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </div>
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

      {/* Add Service Dialog */}
      <Dialog open={openServiceDialog} handler={handleCloseServiceDialog} size="md">
        <DialogHeader>Add Service for {selectedGuest?.name}</DialogHeader>
        <DialogBody divider>
          <div className="space-y-6">
            <div>
              <Typography variant="small" color="gray" className="mb-2">
                Select Service Category
              </Typography>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {["dining", "wellness", "housekeeping", "transport", "entertainment", "special"].map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant="outlined"
                    className="flex items-center gap-1"
                    onClick={() => {
                      // Filter services by category in the select dropdown
                      const select = document.getElementById('service-select');
                      if (select) {
                        // This would need a more sophisticated implementation in a real app
                      }
                    }}
                  >
                    <span>{getServiceCategoryIcon(category)}</span>
                    <span className="capitalize">{category}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Select
              id="service-select"
              label="Select Service"
              value={serviceData.serviceId}
              onChange={(val) => setServiceData({...serviceData, serviceId: val})}
            >
              {AVAILABLE_SERVICES.map((service) => (
                <Option key={service.id} value={service.id}>
                  <div className="flex items-center justify-between">
                    <span>{service.icon} {service.name}</span>
                    <span className="text-green-600 font-bold">{formatCurrency(service.price)}</span>
                  </div>
                  <Typography variant="small" className="opacity-70">
                    {service.description}
                  </Typography>
                </Option>
              ))}
            </Select>

            {serviceData.serviceId && (
              <>
                <div>
                  <Typography variant="small" color="gray" className="mb-2">
                    Service Details
                  </Typography>
                  <div className="bg-blue-gray-50 p-4 rounded-lg">
                    {(() => {
                      const service = AVAILABLE_SERVICES.find(s => s.id === serviceData.serviceId);
                      return (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Price per unit:</span>
                            <span className="font-bold">{formatCurrency(service.price)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Quantity:</span>
                            <Input
                              type="number"
                              value={serviceData.quantity}
                              onChange={(e) => setServiceData({...serviceData, quantity: e.target.value})}
                              className="w-20"
                              min="1"
                            />
                          </div>
                          <div className="flex justify-between font-bold border-t pt-2">
                            <span>Total:</span>
                            <span className="text-green-600">
                              {formatCurrency(service.price * (parseInt(serviceData.quantity) || 1))}
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <Input
                  type="time"
                  label="Scheduled Time (optional)"
                  value={serviceData.scheduledTime}
                  onChange={(e) => setServiceData({...serviceData, scheduledTime: e.target.value})}
                />

                <Textarea
                  label="Special Instructions (optional)"
                  value={serviceData.notes}
                  onChange={(e) => setServiceData({...serviceData, notes: e.target.value})}
                />
              </>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCloseServiceDialog}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button 
            variant="gradient" 
            color="green" 
            onClick={addService}
            disabled={!serviceData.serviceId}
          >
            Add Service
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Service History Dialog */}
      <Dialog open={openServiceHistoryDialog} handler={handleCloseServiceHistoryDialog} size="lg">
        <DialogHeader>Service History - {selectedGuest?.name}</DialogHeader>
        <DialogBody divider>
          {selectedGuest && (
            <div className="space-y-6">
              {/* Guest Summary */}
              <div className="flex items-center gap-4 bg-blue-gray-50 p-4 rounded-lg">
                <Avatar src={selectedGuest.img} alt={selectedGuest.name} size="md" />
                <div>
                  <Typography variant="h6">{selectedGuest.name}</Typography>
                  <Typography variant="small">Room {selectedGuest.roomNumber} • {selectedGuest.roomType}</Typography>
                  <Typography variant="small">Stay: {formatDate(selectedGuest.checkIn)} to {formatDate(selectedGuest.checkOut)}</Typography>
                </div>
              </div>

              {/* Service Statistics */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="p-3">
                  <Typography variant="small" color="gray">Total Services</Typography>
                  <Typography variant="h6">{selectedGuest.services.length}</Typography>
                </Card>
                <Card className="p-3">
                  <Typography variant="small" color="gray">Total Spent</Typography>
                  <Typography variant="h6" color="green">
                    {formatCurrency(selectedGuest.services.reduce((sum, s) => sum + s.total, 0))}
                  </Typography>
                </Card>
                <Card className="p-3">
                  <Typography variant="small" color="gray">Pending</Typography>
                  <Typography variant="h6" color="amber">
                    {selectedGuest.services.filter(s => s.status === "pending").length}
                  </Typography>
                </Card>
                <Card className="p-3">
                  <Typography variant="small" color="gray">Completed</Typography>
                  <Typography variant="h6" color="green">
                    {selectedGuest.services.filter(s => s.status === "completed").length}
                  </Typography>
                </Card>
              </div>

              {/* Service List */}
              <div>
                <Typography variant="h6" className="mb-4">Service Requests</Typography>
                <div className="space-y-4">
                  {selectedGuest.services.length > 0 ? (
                    selectedGuest.services.map((service) => (
                      <Card key={service.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Typography variant="h6">{service.name}</Typography>
                              <Chip
                                variant="ghost"
                                size="sm"
                                value={service.status}
                                color={getServiceStatusColor(service.status)}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <Typography variant="small" color="gray">Quantity:</Typography>
                                <Typography>{service.quantity}</Typography>
                              </div>
                              <div>
                                <Typography variant="small" color="gray">Unit Price:</Typography>
                                <Typography>{formatCurrency(service.price)}</Typography>
                              </div>
                              <div>
                                <Typography variant="small" color="gray">Total:</Typography>
                                <Typography className="font-bold">{formatCurrency(service.total)}</Typography>
                              </div>
                              <div>
                                <Typography variant="small" color="gray">Requested:</Typography>
                                <Typography>{formatDate(service.requestedDate)}</Typography>
                              </div>
                              {service.scheduledTime && (
                                <div>
                                  <Typography variant="small" color="gray">Scheduled:</Typography>
                                  <Typography>{service.scheduledTime}</Typography>
                                </div>
                              )}
                              {service.completedDate && (
                                <div>
                                  <Typography variant="small" color="gray">Completed:</Typography>
                                  <Typography>{formatDate(service.completedDate)}</Typography>
                                </div>
                              )}
                            </div>
                            {service.notes && (
                              <div className="mt-2">
                                <Typography variant="small" color="gray">Notes:</Typography>
                                <Typography variant="small">{service.notes}</Typography>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-1">
                            {service.status === "pending" && (
                              <>
                                <Tooltip content="Start">
                                  <IconButton 
                                    size="sm"
                                    variant="text" 
                                    color="blue"
                                    onClick={() => {
                                      updateServiceStatus(selectedGuest.id, service.id, "in-progress");
                                      handleCloseServiceHistoryDialog();
                                    }}
                                  >
                                    <ClockIcon className="h-4 w-4" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip content="Complete">
                                  <IconButton 
                                    size="sm"
                                    variant="text" 
                                    color="green"
                                    onClick={() => {
                                      updateServiceStatus(selectedGuest.id, service.id, "completed");
                                      handleCloseServiceHistoryDialog();
                                    }}
                                  >
                                    <CheckCircleIcon className="h-4 w-4" />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                            {service.status === "in-progress" && (
                              <Tooltip content="Complete">
                                <IconButton 
                                  size="sm"
                                  variant="text" 
                                  color="green"
                                  onClick={() => {
                                    updateServiceStatus(selectedGuest.id, service.id, "completed");
                                    handleCloseServiceHistoryDialog();
                                  }}
                                >
                                  <CheckCircleIcon className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Typography className="text-center text-gray-500 py-8">
                      No services have been requested yet
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleCloseServiceHistoryDialog}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Services;
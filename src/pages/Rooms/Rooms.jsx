import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  PencilIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  HomeModernIcon,
  UsersIcon,
  WifiIcon,
  TvIcon,
  FireIcon,
  CakeIcon,
  TruckIcon,
  KeyIcon
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
  Switch
} from "@material-tailwind/react";
import { useState, useEffect } from "react";

const TABS = [
  {
    label: "All Rooms",
    value: "all",
  },
  {
    label: "Available",
    value: "available",
  },
  {
    label: "Occupied",
    value: "occupied",
  },
  {
    label: "Maintenance",
    value: "maintenance",
  },
  {
    label: "Reserved",
    value: "reserved",
  },
];

const ROOM_TYPES = [
  { value: "standard", label: "Standard Room", basePrice: 100, capacity: 2, size: "25m²", icon: HomeModernIcon },
  { value: "deluxe", label: "Deluxe Room", basePrice: 150, capacity: 2, size: "35m²", icon: HomeModernIcon },
  { value: "executive", label: "Executive Room", basePrice: 200, capacity: 3, size: "45m²", icon: HomeModernIcon },
  { value: "suite", label: "Deluxe Suite", basePrice: 300, capacity: 4, size: "65m²", icon: HomeModernIcon },
  { value: "presidential", label: "Presidential Suite", basePrice: 500, capacity: 6, size: "100m²", icon: HomeModernIcon },
];

const FLOORS = ["1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor", "7th Floor", "8th Floor", "9th Floor", "10th Floor"];
const WING_OPTIONS = ["North", "South", "East", "West"];
const VIEW_TYPES = ["City View", "Garden View", "Pool View", "Sea View", "Mountain View"];
const BED_TYPES = ["King", "Queen", "Double", "Single", "Twin"];

const TABLE_HEAD = ["Room #", "Type", "Floor/Wing", "Status", "Capacity", "Amenities", "Current Guest", "Actions"];

const initialRooms = [
  {
    id: "RM001",
    roomNumber: "101",
    floor: "1st Floor",
    wing: "North",
    type: "standard",
    status: "occupied",
    capacity: 2,
    bedType: "Queen",
    view: "Garden View",
    size: "25m²",
    price: 100,
    amenities: ["WiFi", "TV", "AC", "Mini Bar"],
    currentGuest: {
      name: "John Michael",
      checkIn: "2024-03-15",
      checkOut: "2024-03-20",
      bookingId: "BKG1001"
    },
    lastCleaned: "2024-03-15",
    nextMaintenance: "2024-04-15",
    issues: []
  },
  {
    id: "RM002",
    roomNumber: "102",
    floor: "1st Floor",
    wing: "North",
    type: "standard",
    status: "available",
    capacity: 2,
    bedType: "Queen",
    view: "Garden View",
    size: "25m²",
    price: 100,
    amenities: ["WiFi", "TV", "AC"],
    currentGuest: null,
    lastCleaned: "2024-03-16",
    nextMaintenance: "2024-04-15",
    issues: []
  },
  {
    id: "RM003",
    roomNumber: "201",
    floor: "2nd Floor",
    wing: "South",
    type: "deluxe",
    status: "available",
    capacity: 2,
    bedType: "King",
    view: "Pool View",
    size: "35m²",
    price: 150,
    amenities: ["WiFi", "TV", "AC", "Mini Bar", "Balcony"],
    currentGuest: null,
    lastCleaned: "2024-03-16",
    nextMaintenance: "2024-04-20",
    issues: []
  },
  {
    id: "RM004",
    roomNumber: "202",
    floor: "2nd Floor",
    wing: "South",
    type: "deluxe",
    status: "maintenance",
    capacity: 2,
    bedType: "King",
    view: "Pool View",
    size: "35m²",
    price: 150,
    amenities: ["WiFi", "TV", "AC", "Mini Bar", "Balcony"],
    currentGuest: null,
    lastCleaned: "2024-03-14",
    nextMaintenance: "2024-03-20",
    issues: ["AC not working", "Leaking faucet"]
  },
  {
    id: "RM005",
    roomNumber: "301",
    floor: "3rd Floor",
    wing: "East",
    type: "executive",
    status: "occupied",
    capacity: 3,
    bedType: "King",
    view: "City View",
    size: "45m²",
    price: 200,
    amenities: ["WiFi", "TV", "AC", "Mini Bar", "Balcony", "Work Desk"],
    currentGuest: {
      name: "Alexa Liras",
      checkIn: "2024-03-10",
      checkOut: "2024-03-14",
      bookingId: "BKG1002"
    },
    lastCleaned: "2024-03-15",
    nextMaintenance: "2024-05-01",
    issues: []
  },
  {
    id: "RM006",
    roomNumber: "401",
    floor: "4th Floor",
    wing: "West",
    type: "suite",
    status: "reserved",
    capacity: 4,
    bedType: "King",
    view: "Sea View",
    size: "65m²",
    price: 300,
    amenities: ["WiFi", "TV", "AC", "Mini Bar", "Balcony", "Living Area", "Jacuzzi"],
    currentGuest: null,
    expectedArrival: "2024-03-20",
    lastCleaned: "2024-03-16",
    nextMaintenance: "2024-04-25",
    issues: []
  },
  {
    id: "RM007",
    roomNumber: "1501",
    floor: "15th Floor",
    wing: "East",
    type: "presidential",
    status: "available",
    capacity: 6,
    bedType: "King",
    view: "Sea View",
    size: "100m²",
    price: 500,
    amenities: ["WiFi", "TV", "AC", "Mini Bar", "Balcony", "Living Area", "Dining Area", "Jacuzzi", "Kitchen"],
    currentGuest: null,
    lastCleaned: "2024-03-16",
    nextMaintenance: "2024-05-10",
    issues: []
  },
  {
    id: "RM008",
    roomNumber: "502",
    floor: "5th Floor",
    wing: "North",
    type: "standard",
    status: "available",
    capacity: 2,
    bedType: "Double",
    view: "City View",
    size: "25m²",
    price: 100,
    amenities: ["WiFi", "TV", "AC"],
    currentGuest: null,
    lastCleaned: "2024-03-16",
    nextMaintenance: "2024-04-18",
    issues: []
  },
];

export function Rooms() {
  const [rooms, setRooms] = useState(initialRooms);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [dialogMode, setDialogMode] = useState("add"); // 'add', 'edit', 'view', 'maintenance'
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    floor: "1st Floor",
    wing: "North",
    type: "standard",
    bedType: "Queen",
    view: "City View",
    status: "available",
    price: 100,
    amenities: [],
    issues: [],
    lastCleaned: new Date().toISOString().split('T')[0],
    nextMaintenance: "",
  });

  // Filter rooms based on search and tab
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = 
      room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.currentGuest?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.floor.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && room.status === activeTab;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case "available": return "green";
      case "occupied": return "blue";
      case "maintenance": return "red";
      case "reserved": return "amber";
      default: return "blue-gray";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "available": return CheckCircleIcon;
      case "occupied": return UsersIcon;
      case "maintenance": return XCircleIcon;
      case "reserved": return KeyIcon;
      default: return HomeModernIcon;
    }
  };

  const handleOpenDialog = (mode, room = null) => {
    setDialogMode(mode);
    setSelectedRoom(room);
    if (mode === "add") {
      setNewRoom({
        roomNumber: "",
        floor: "1st Floor",
        wing: "North",
        type: "standard",
        bedType: "Queen",
        view: "City View",
        status: "available",
        price: 100,
        amenities: [],
        issues: [],
        lastCleaned: new Date().toISOString().split('T')[0],
        nextMaintenance: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRoom(null);
  };

  const handleAddRoom = () => {
    const roomId = `RM${String(rooms.length + 101).padStart(3, '0')}`;
    const roomType = ROOM_TYPES.find(r => r.value === newRoom.type);
    
    const room = {
      id: roomId,
      ...newRoom,
      capacity: roomType.capacity,
      size: roomType.size,
      price: roomType.basePrice,
      amenities: newRoom.amenities,
      currentGuest: null,
    };
    
    setRooms([...rooms, room]);
    handleCloseDialog();
  };

  const handleUpdateRoom = () => {
    setRooms(rooms.map(room => 
      room.id === selectedRoom.id ? selectedRoom : room
    ));
    handleCloseDialog();
  };

  const handleStatusChange = (roomId, newStatus) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, status: newStatus }
        : room
    ));
  };

  const handleMarkCleaned = (roomId) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, lastCleaned: new Date().toISOString().split('T')[0] }
        : room
    ));
  };

  const handleReportIssue = (roomId, issue) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, issues: [...room.issues, issue], status: "maintenance" }
        : room
    ));
  };

  const handleResolveIssue = (roomId, issueIndex) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { 
            ...room, 
            issues: room.issues.filter((_, i) => i !== issueIndex),
            status: room.issues.length === 1 ? "available" : room.status
          }
        : room
    ));
  };

  // Calculate statistics
  const calculateStats = () => {
    const total = rooms.length;
    const available = rooms.filter(r => r.status === "available").length;
    const occupied = rooms.filter(r => r.status === "occupied").length;
    const maintenance = rooms.filter(r => r.status === "maintenance").length;
    const reserved = rooms.filter(r => r.status === "reserved").length;
    
    const occupancyRate = ((occupied + reserved) / total) * 100;
    const availableRate = (available / total) * 100;
    
    return {
      total,
      available,
      occupied,
      maintenance,
      reserved,
      occupancyRate: occupancyRate.toFixed(1),
      availableRate: availableRate.toFixed(1)
    };
  };

  const stats = calculateStats();

  const amenityIcons = {
    "WiFi": WifiIcon,
    "TV": TvIcon,
    "AC": FireIcon,
    "Mini Bar": CakeIcon,
    "Balcony": HomeModernIcon,
    "Jacuzzi": FireIcon,
    "Kitchen": CakeIcon,
    "Work Desk": HomeModernIcon,
    "Living Area": HomeModernIcon,
    "Dining Area": CakeIcon,
  };

  return (
    <>
      {/* Stats Cards */}
      <div className="mb-4 grid gap-4 md:grid-cols-5">
        <Card className="p-4">
          <Typography variant="small" color="gray" className="flex items-center gap-1">
            <HomeModernIcon className="h-4 w-4" /> Total Rooms
          </Typography>
          <Typography variant="h4">{stats.total}</Typography>
        </Card>
        <Card className="p-4">
          <Typography variant="small" color="gray" className="flex items-center gap-1">
            <CheckCircleIcon className="h-4 w-4 text-green-500" /> Available
          </Typography>
          <Typography variant="h4">{stats.available}</Typography>
          <Typography variant="small" color="gray">{stats.availableRate}%</Typography>
        </Card>
        <Card className="p-4">
          <Typography variant="small" color="gray" className="flex items-center gap-1">
            <UsersIcon className="h-4 w-4 text-blue-500" /> Occupied
          </Typography>
          <Typography variant="h4">{stats.occupied}</Typography>
        </Card>
        <Card className="p-4">
          <Typography variant="small" color="gray" className="flex items-center gap-1">
            <KeyIcon className="h-4 w-4 text-amber-500" /> Reserved
          </Typography>
          <Typography variant="h4">{stats.reserved}</Typography>
        </Card>
        <Card className="p-4">
          <Typography variant="small" color="gray" className="flex items-center gap-1">
            <XCircleIcon className="h-4 w-4 text-red-500" /> Maintenance
          </Typography>
          <Typography variant="h4">{stats.maintenance}</Typography>
        </Card>
      </div>

      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Hotel Room Management
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Manage rooms, availability, maintenance, and assignments
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
                Generate Report
              </Button>
              <Button 
                className="flex items-center gap-3" 
                size="sm"
                onClick={() => handleOpenDialog("add")}
              >
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add New Room
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
                label="Search by room #, type, floor, or guest"
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
              {filteredRooms.map((room, index) => {
                const isLast = index === filteredRooms.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                const StatusIcon = getStatusIcon(room.status);
 
                return (
                  <tr key={room.id}>
                    <td className={classes}>
                      <div>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {room.roomNumber}
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal opacity-70">
                          ID: {room.id}
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
                          {ROOM_TYPES.find(t => t.value === room.type)?.label}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {room.bedType} Bed
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {room.view}
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
                          {room.floor}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {room.wing} Wing
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={room.status}
                          color={getStatusColor(room.status)}
                          icon={<StatusIcon className="h-4 w-4" />}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" className="font-normal">
                          {room.capacity} Guests
                        </Typography>
                        <Typography variant="small" className="font-normal opacity-70">
                          {room.size}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex gap-1 flex-wrap">
                        {room.amenities.slice(0, 3).map((amenity, i) => {
                          const AmenityIcon = amenityIcons[amenity] || HomeModernIcon;
                          return (
                            <Tooltip key={i} content={amenity}>
                              <div className="p-1 bg-blue-gray-50 rounded">
                                <AmenityIcon className="h-3 w-3" />
                              </div>
                            </Tooltip>
                          );
                        })}
                        {room.amenities.length > 3 && (
                          <Tooltip content={`+${room.amenities.length - 3} more`}>
                            <div className="p-1 bg-blue-gray-50 rounded">
                              <span className="text-xs">+{room.amenities.length - 3}</span>
                            </div>
                          </Tooltip>
                        )}
                      </div>
                    </td>
                    <td className={classes}>
                      {room.currentGuest ? (
                        <div>
                          <Typography variant="small" className="font-normal">
                            {room.currentGuest.name}
                          </Typography>
                          <Typography variant="small" className="font-normal opacity-70">
                            Until: {room.currentGuest.checkOut}
                          </Typography>
                          <Typography variant="small" className="font-normal opacity-70">
                            {room.currentGuest.bookingId}
                          </Typography>
                        </div>
                      ) : room.expectedArrival ? (
                        <div>
                          <Typography variant="small" className="font-normal text-amber-600">
                            Expected: {room.expectedArrival}
                          </Typography>
                        </div>
                      ) : (
                        <Typography variant="small" className="font-normal opacity-70">
                          No guest
                        </Typography>
                      )}
                    </td>
                    <td className={classes}>
                      <div className="flex gap-2">
                        {room.status === "available" && (
                          <Tooltip content="Mark as Occupied">
                            <IconButton 
                              variant="text" 
                              color="blue"
                              onClick={() => handleStatusChange(room.id, "occupied")}
                            >
                              <UsersIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {room.status === "occupied" && (
                          <Tooltip content="Check Out / Make Available">
                            <IconButton 
                              variant="text" 
                              color="green"
                              onClick={() => handleStatusChange(room.id, "available")}
                            >
                              <CheckCircleIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip content="Mark as Cleaned">
                          <IconButton 
                            variant="text" 
                            color="green"
                            onClick={() => handleMarkCleaned(room.id)}
                          >
                            <CheckCircleIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Report Issue">
                          <IconButton 
                            variant="text" 
                            color="amber"
                            onClick={() => {
                              const issue = prompt("Describe the issue:");
                              if (issue) handleReportIssue(room.id, issue);
                            }}
                          >
                            <XCircleIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Edit Room">
                          <IconButton 
                            variant="text"
                            onClick={() => handleOpenDialog("edit", room)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="View Details">
                          <Button
                            variant="text"
                            size="sm"
                            onClick={() => handleOpenDialog("view", room)}
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
            Showing {filteredRooms.length} of {rooms.length} rooms
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

      {/* Room Dialog */}
      <Dialog open={openDialog} handler={handleCloseDialog} size={dialogMode === "view" ? "md" : "lg"}>
        <DialogHeader>
          {dialogMode === "add" && "Add New Room"}
          {dialogMode === "edit" && "Edit Room"}
          {dialogMode === "view" && "Room Details"}
          {dialogMode === "maintenance" && "Maintenance Report"}
        </DialogHeader>
        <DialogBody divider className="max-h-[70vh] overflow-scroll">
          <div className="space-y-4">
            {dialogMode === "view" && selectedRoom ? (
              // View Mode
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="h4">Room {selectedRoom.roomNumber}</Typography>
                    <Typography variant="small" color="gray">ID: {selectedRoom.id}</Typography>
                  </div>
                  <Chip
                    variant="ghost"
                    size="sm"
                    value={selectedRoom.status}
                    color={getStatusColor(selectedRoom.status)}
                    icon={React.createElement(getStatusIcon(selectedRoom.status), { className: "h-4 w-4" })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-2">Room Details</Typography>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Typography variant="small" color="gray">Type:</Typography>
                        <Typography>{ROOM_TYPES.find(t => t.value === selectedRoom.type)?.label}</Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography variant="small" color="gray">Floor:</Typography>
                        <Typography>{selectedRoom.floor}</Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography variant="small" color="gray">Wing:</Typography>
                        <Typography>{selectedRoom.wing}</Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography variant="small" color="gray">View:</Typography>
                        <Typography>{selectedRoom.view}</Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography variant="small" color="gray">Bed Type:</Typography>
                        <Typography>{selectedRoom.bedType}</Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography variant="small" color="gray">Capacity:</Typography>
                        <Typography>{selectedRoom.capacity} Guests</Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography variant="small" color="gray">Size:</Typography>
                        <Typography>{selectedRoom.size}</Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography variant="small" color="gray">Price/Night:</Typography>
                        <Typography className="font-bold">${selectedRoom.price}</Typography>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-2">Maintenance Info</Typography>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Typography variant="small" color="gray">Last Cleaned:</Typography>
                        <Typography>{selectedRoom.lastCleaned}</Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography variant="small" color="gray">Next Maintenance:</Typography>
                        <Typography>{selectedRoom.nextMaintenance || "Not scheduled"}</Typography>
                      </div>
                    </div>

                    {selectedRoom.issues.length > 0 && (
                      <div className="mt-4">
                        <Typography variant="h6" color="red" className="mb-2">Issues</Typography>
                        <ul className="list-disc pl-4">
                          {selectedRoom.issues.map((issue, i) => (
                            <li key={i} className="text-sm">{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Typography variant="h6" color="blue-gray" className="mb-2">Amenities</Typography>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoom.amenities.map((amenity, i) => {
                      const AmenityIcon = amenityIcons[amenity] || HomeModernIcon;
                      return (
                        <Chip
                          key={i}
                          variant="ghost"
                          size="sm"
                          value={amenity}
                          icon={<AmenityIcon className="h-3 w-3" />}
                        />
                      );
                    })}
                  </div>
                </div>

                {selectedRoom.currentGuest && (
                  <div className="border-t pt-4">
                    <Typography variant="h6" color="blue-gray" className="mb-2">Current Guest</Typography>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="h6">{selectedRoom.currentGuest.name}</Typography>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <Typography variant="small" color="gray">Check In</Typography>
                          <Typography>{selectedRoom.currentGuest.checkIn}</Typography>
                        </div>
                        <div>
                          <Typography variant="small" color="gray">Check Out</Typography>
                          <Typography>{selectedRoom.currentGuest.checkOut}</Typography>
                        </div>
                        <div>
                          <Typography variant="small" color="gray">Booking ID</Typography>
                          <Typography>{selectedRoom.currentGuest.bookingId}</Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Add/Edit Mode
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="Room Number" 
                    value={dialogMode === "edit" ? selectedRoom?.roomNumber : newRoom.roomNumber}
                    onChange={(e) => setNewRoom({...newRoom, roomNumber: e.target.value})}
                  />
                  
                  <Select 
                    label="Floor"
                    value={dialogMode === "edit" ? selectedRoom?.floor : newRoom.floor}
                    onChange={(val) => setNewRoom({...newRoom, floor: val})}
                  >
                    {FLOORS.map(floor => (
                      <Option key={floor} value={floor}>{floor}</Option>
                    ))}
                  </Select>

                  <Select 
                    label="Wing"
                    value={dialogMode === "edit" ? selectedRoom?.wing : newRoom.wing}
                    onChange={(val) => setNewRoom({...newRoom, wing: val})}
                  >
                    {WING_OPTIONS.map(wing => (
                      <Option key={wing} value={wing}>{wing} Wing</Option>
                    ))}
                  </Select>

                  <Select 
                    label="Room Type"
                    value={dialogMode === "edit" ? selectedRoom?.type : newRoom.type}
                    onChange={(val) => {
                      const roomType = ROOM_TYPES.find(r => r.value === val);
                      setNewRoom({
                        ...newRoom, 
                        type: val,
                        price: roomType.basePrice,
                        capacity: roomType.capacity,
                        size: roomType.size
                      });
                    }}
                  >
                    {ROOM_TYPES.map(room => (
                      <Option key={room.value} value={room.value}>
                        {room.label} - ${room.basePrice}/night
                      </Option>
                    ))}
                  </Select>

                  <Select 
                    label="Bed Type"
                    value={dialogMode === "edit" ? selectedRoom?.bedType : newRoom.bedType}
                    onChange={(val) => setNewRoom({...newRoom, bedType: val})}
                  >
                    {BED_TYPES.map(bed => (
                      <Option key={bed} value={bed}>{bed}</Option>
                    ))}
                  </Select>

                  <Select 
                    label="View"
                    value={dialogMode === "edit" ? selectedRoom?.view : newRoom.view}
                    onChange={(val) => setNewRoom({...newRoom, view: val})}
                  >
                    {VIEW_TYPES.map(view => (
                      <Option key={view} value={view}>{view}</Option>
                    ))}
                  </Select>

                  <Select 
                    label="Status"
                    value={dialogMode === "edit" ? selectedRoom?.status : newRoom.status}
                    onChange={(val) => setNewRoom({...newRoom, status: val})}
                  >
                    <Option value="available">Available</Option>
                    <Option value="occupied">Occupied</Option>
                    <Option value="maintenance">Maintenance</Option>
                    <Option value="reserved">Reserved</Option>
                  </Select>

                  <Input 
                    label="Price per Night ($)" 
                    type="number"
                    value={dialogMode === "edit" ? selectedRoom?.price : newRoom.price}
                    onChange={(e) => setNewRoom({...newRoom, price: parseInt(e.target.value)})}
                  />
                </div>

                <div className="border-t pt-4">
                  <Typography variant="h6" color="blue-gray" className="mb-4">Amenities</Typography>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(amenityIcons).map(amenity => (
                      <div key={amenity} className="flex items-center">
                        <Switch
                          id={`amenity-${amenity}`}
                          ripple={false}
                          checked={newRoom.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewRoom({
                                ...newRoom,
                                amenities: [...newRoom.amenities, amenity]
                              });
                            } else {
                              setNewRoom({
                                ...newRoom,
                                amenities: newRoom.amenities.filter(a => a !== amenity)
                              });
                            }
                          }}
                        />
                        <Typography className="ml-2">{amenity}</Typography>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Typography variant="h6" color="blue-gray" className="mb-4">Maintenance</Typography>
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      label="Last Cleaned Date" 
                      type="date"
                      value={dialogMode === "edit" ? selectedRoom?.lastCleaned : newRoom.lastCleaned}
                      onChange={(e) => setNewRoom({...newRoom, lastCleaned: e.target.value})}
                    />
                    <Input 
                      label="Next Maintenance Date" 
                      type="date"
                      value={dialogMode === "edit" ? selectedRoom?.nextMaintenance : newRoom.nextMaintenance}
                      onChange={(e) => setNewRoom({...newRoom, nextMaintenance: e.target.value})}
                    />
                  </div>
                </div>

                {dialogMode === "edit" && selectedRoom?.issues.length > 0 && (
                  <div className="border-t pt-4">
                    <Typography variant="h6" color="red" className="mb-4">Current Issues</Typography>
                    {selectedRoom.issues.map((issue, i) => (
                      <div key={i} className="flex items-center justify-between mb-2">
                        <Typography>{issue}</Typography>
                        <Button
                          size="sm"
                          color="green"
                          onClick={() => handleResolveIssue(selectedRoom.id, i)}
                        >
                          Resolve
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
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
          {dialogMode !== "view" && dialogMode !== "maintenance" && (
            <Button 
              variant="gradient" 
              color="green" 
              onClick={dialogMode === "add" ? handleAddRoom : handleUpdateRoom}
            >
              {dialogMode === "add" ? "Add Room" : "Save Changes"}
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Rooms;
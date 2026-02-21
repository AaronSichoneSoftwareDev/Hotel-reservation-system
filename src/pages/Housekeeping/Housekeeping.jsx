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
  Select,
  Option,
} from "@material-tailwind/react";
 
const TABS = [
  {
    label: "All Rooms",
    value: "all",
  },
  {
    label: "Clean",
    value: "clean",
  },
  {
    label: "Dirty",
    value: "dirty",
  },
  {
    label: "Inspected",
    value: "inspected",
  },
  {
    label: "Out of Service",
    value: "oos",
  },
];
 
const TABLE_HEAD = ["Room", "Status", "Housekeeper", "Last Cleaned", "Priority", "Notes", "Actions"];
 
const TABLE_ROWS = [
  {
    roomNumber: "101",
    roomType: "Standard",
    status: "clean",
    housekeeper: "Maria Santos",
    lastCleaned: "2024-01-15 10:30 AM",
    priority: "normal",
    notes: "Guest checked out",
    image: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
  },
  {
    roomNumber: "102",
    roomType: "Deluxe",
    status: "dirty",
    housekeeper: "Juan Dela Cruz",
    lastCleaned: "2024-01-14 02:15 PM",
    priority: "high",
    notes: "VIP guest arriving at 3PM",
    image: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
  },
  {
    roomNumber: "201",
    roomType: "Suite",
    status: "inspected",
    housekeeper: "Ana Reyes",
    lastCleaned: "2024-01-15 09:00 AM",
    priority: "normal",
    notes: "Ready for check-in",
    image: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
  },
  {
    roomNumber: "202",
    roomType: "Standard",
    status: "oos",
    housekeeper: "Pedro Lim",
    lastCleaned: "2024-01-13 11:45 AM",
    priority: "low",
    notes: "Maintenance required - AC issue",
    image: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
  },
  {
    roomNumber: "301",
    roomType: "Executive Suite",
    status: "dirty",
    housekeeper: "Lisa Wong",
    lastCleaned: "2024-01-14 04:30 PM",
    priority: "high",
    notes: "Express service requested",
    image: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
  },
  {
    roomNumber: "302",
    roomType: "Deluxe",
    status: "clean",
    housekeeper: "Maria Santos",
    lastCleaned: "2024-01-15 08:15 AM",
    priority: "normal",
    notes: "Occupied - light cleaning",
    image: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
  },
];
 
const getStatusColor = (status) => {
  switch(status) {
    case "clean":
      return "green";
    case "dirty":
      return "red";
    case "inspected":
      return "blue";
    case "oos":
      return "orange";
    default:
      return "gray";
  }
};

const getPriorityColor = (priority) => {
  switch(priority) {
    case "high":
      return "red";
    case "normal":
      return "green";
    case "low":
      return "blue-gray";
    default:
      return "gray";
  }
};

const getStatusLabel = (status) => {
  switch(status) {
    case "clean":
      return "Clean";
    case "dirty":
      return "Dirty";
    case "inspected":
      return "Inspected";
    case "oos":
      return "Out of Service";
    default:
      return status;
  }
};

export function Housekeeping() {
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Housekeeping Management
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Manage room cleaning status and assignments
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              View Schedule
            </Button>
            <Button variant="outlined" size="sm">
              Generate Report
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Assign Housekeeper
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
                label="Search rooms or housekeepers"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Select label="Filter by floor" className="w-40">
              <Option value="all">All Floors</Option>
              <Option value="1">Floor 1</Option>
              <Option value="2">Floor 2</Option>
              <Option value="3">Floor 3</Option>
              <Option value="4">Floor 4</Option>
              <Option value="5">Floor 5</Option>
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
              ({ roomNumber, roomType, status, housekeeper, lastCleaned, priority, notes, image }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={roomNumber}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Room {roomNumber}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {roomType}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={getStatusLabel(status)}
                          color={getStatusColor(status)}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-2">
                        <Avatar src={image} alt={housekeeper} size="xs" />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {housekeeper}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {lastCleaned}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={priority}
                        color={getPriorityColor(priority)}
                      />
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {notes}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-2">
                        <Tooltip content="Mark as Clean">
                          <IconButton variant="text" color="green">
                            <CheckCircleIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Mark as Dirty">
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
            Showing 1 to {TABLE_ROWS.length} of 24 rooms
          </Typography>
          <div className="flex gap-1">
            <Chip variant="ghost" size="sm" value="Clean: 2" color="green" />
            <Chip variant="ghost" size="sm" value="Dirty: 2" color="red" />
            <Chip variant="ghost" size="sm" value="Inspected: 1" color="blue" />
            <Chip variant="ghost" size="sm" value="OOS: 1" color="orange" />
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
export default Housekeeping;
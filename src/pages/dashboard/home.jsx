import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Select,
  Option,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyDollarIcon,
  HomeModernIcon,
  UserGroupIcon,
  CreditCardIcon,
  WrenchIcon,
  SparklesIcon,
  ClockIcon,
  CalendarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";

// Mock room performance data (converted to ZMK)
const roomPerformanceData = [
  { 
    type: "Standard Room", 
    code: "standard",
    totalRooms: 20,
    booked: 18,
    revenue: 54000 * 21, // Converted to ZMK (approx rate)
    avgPrice: 100 * 21,
    occupancyRate: 90,
    trend: "+5%",
    popular: true,
  },
  { 
    type: "Deluxe Room", 
    code: "deluxe",
    totalRooms: 15,
    booked: 12,
    revenue: 54000 * 21,
    avgPrice: 150 * 21,
    occupancyRate: 80,
    trend: "+2%",
    popular: true,
  },
  { 
    type: "Executive Room", 
    code: "executive",
    totalRooms: 10,
    booked: 7,
    revenue: 42000 * 21,
    avgPrice: 200 * 21,
    occupancyRate: 70,
    trend: "-3%",
    popular: false,
  },
  { 
    type: "Deluxe Suite", 
    code: "suite",
    totalRooms: 5,
    booked: 4,
    revenue: 36000 * 21,
    avgPrice: 300 * 21,
    occupancyRate: 80,
    trend: "+8%",
    popular: true,
  },
  { 
    type: "Presidential Suite", 
    code: "presidential",
    totalRooms: 2,
    booked: 1,
    revenue: 15000 * 21,
    avgPrice: 500 * 21,
    occupancyRate: 50,
    trend: "-10%",
    popular: false,
  },
];

// Mock seasonal data (converted to ZMK)
const seasonalData = [
  { month: "January", occupancy: 65, revenue: 145000 * 21, events: "New Year, Low Season" },
  { month: "February", occupancy: 70, revenue: 158000 * 21, events: "Valentine's Day" },
  { month: "March", occupancy: 82, revenue: 185000 * 21, events: "Spring Break" },
  { month: "April", occupancy: 85, revenue: 192000 * 21, events: "Easter Holiday" },
  { month: "May", occupancy: 78, revenue: 176000 * 21, events: "Mother's Day" },
  { month: "June", occupancy: 92, revenue: 245000 * 21, events: "Summer Start, Weddings" },
  { month: "July", occupancy: 95, revenue: 268000 * 21, events: "Peak Summer, Independence Day" },
  { month: "August", occupancy: 94, revenue: 258000 * 21, events: "Summer Peak" },
  { month: "September", occupancy: 75, revenue: 169000 * 21, events: "Back to School" },
  { month: "October", occupancy: 72, revenue: 162000 * 21, events: "Fall Season" },
  { month: "November", occupancy: 68, revenue: 154000 * 21, events: "Thanksgiving, Low Season" },
  { month: "December", occupancy: 85, revenue: 210000 * 21, events: "Christmas, New Year Eve" },
];

// Mock booking trends by day of week (converted to ZMK)
const dayOfWeekData = [
  { day: "Monday", occupancy: 65, avgRate: 145 * 21 },
  { day: "Tuesday", occupancy: 62, avgRate: 142 * 21 },
  { day: "Wednesday", occupancy: 68, avgRate: 148 * 21 },
  { day: "Thursday", occupancy: 75, avgRate: 165 * 21 },
  { day: "Friday", occupancy: 92, avgRate: 210 * 21 },
  { day: "Saturday", occupancy: 95, avgRate: 225 * 21 },
  { day: "Sunday", occupancy: 78, avgRate: 170 * 21 },
];

export function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [roomTypeFilter, setRoomTypeFilter] = useState("all");
  const [profitData, setProfitData] = useState({
    revenue: 245000 * 21,
    costs: 168000 * 21,
    profit: 77000 * 21,
    occupancyRate: 78,
    avgDailyRate: 185 * 21,
    revPAR: 144.3 * 21,
  });

  useEffect(() => {
    calculateProfitMetrics();
  }, [selectedPeriod]);

  const calculateProfitMetrics = () => {
    const totalRevenue = 245000 * 21;
    const totalCosts = 168000 * 21;
    const profit = totalRevenue - totalCosts;
    const profitMargin = (profit / totalRevenue) * 100;

    setProfitData({
      revenue: totalRevenue,
      costs: totalCosts,
      profit: profit,
      profitMargin: profitMargin.toFixed(1),
      occupancyRate: 78,
      avgDailyRate: 185 * 21,
      revPAR: 144.3 * 21,
    });
  };

  // Find peak and low seasons
  const peakMonths = seasonalData.filter(m => m.occupancy > 85).sort((a, b) => b.occupancy - a.occupancy);
  const lowMonths = seasonalData.filter(m => m.occupancy < 70).sort((a, b) => a.occupancy - b.occupancy);
  
  // Calculate room type statistics
  const mostBookedRoom = roomPerformanceData.reduce((max, room) => 
    room.occupancyRate > max.occupancyRate ? room : max
  );
  
  const leastBookedRoom = roomPerformanceData.reduce((min, room) => 
    room.occupancyRate < min.occupancyRate ? room : min
  );

  const totalRooms = roomPerformanceData.reduce((sum, room) => sum + room.totalRooms, 0);
  const totalBooked = roomPerformanceData.reduce((sum, room) => sum + room.booked, 0);
  const overallOccupancy = ((totalBooked / totalRooms) * 100).toFixed(1);

  // Revenue opportunities based on room performance (converted to ZMK)
  const roomOpportunities = roomPerformanceData
    .filter(room => room.occupancyRate < 75)
    .map(room => ({
      roomType: room.type,
      currentRate: room.avgPrice,
      recommendedAction: room.occupancyRate < 60 ? "Price reduction & promotion" : "Bundle with services",
      potentialRevenue: Math.round(room.totalRooms * (85 - room.occupancyRate) / 100 * room.avgPrice * 30),
    }));

  // Format ZMK currency
  const formatZMK = (amount) => {
    return `ZMK ${Math.round(amount).toLocaleString()}`;
  };

  return (
    <div className="mt-12">
      {/* Period Selector */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Typography variant="h4" color="blue-gray">
            Profit Analytics Dashboard
          </Typography>
          <Typography variant="small" color="gray" className="mt-1">
            Real-time insights connecting data to profitability
          </Typography>
        </div>
        <div className="w-72">
          <Select
            value={selectedPeriod}
            onChange={(val) => setSelectedPeriod(val)}
            label="Select Period"
          >
            <Option value="today">Today</Option>
            <Option value="week">This Week</Option>
            <Option value="month">This Month</Option>
            <Option value="quarter">This Quarter</Option>
            <Option value="year">This Year</Option>
          </Select>
        </div>
      </div>

      {/* Key Profit Metrics */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            icon: CurrencyDollarIcon,
            title: "Total Revenue",
            value: formatZMK(profitData.revenue),
            footer: { color: "text-green-500", value: "+12.5%", label: "vs last month" },
          },
          {
            icon: HomeModernIcon,
            title: "Total Costs",
            value: formatZMK(profitData.costs),
            footer: { color: "text-red-500", value: "+5.2%", label: "vs last month" },
          },
          {
            icon: SparklesIcon,
            title: "Net Profit",
            value: formatZMK(profitData.profit),
            footer: { color: "text-green-500", value: `${profitData.profitMargin}%`, label: "margin" },
          },
          {
            icon: UserGroupIcon,
            title: "Occupancy Rate",
            value: `${profitData.occupancyRate}%`,
            footer: { color: "text-blue-500", value: "RevPAR", label: formatZMK(profitData.revPAR) },
          },
        ].map(({ icon, title, value, footer }) => (
          <StatisticsCard
            key={title}
            title={title}
            value={value}
            icon={React.createElement(icon, { className: "w-6 h-6 text-white" })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>

      {/* NEW SECTION: Room Performance Analytics */}
      <div className="mb-8">
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Room Performance Analytics
                </Typography>
                <Typography variant="small" color="gray" className="mt-1">
                  Track which room types perform best and optimize pricing strategy
                </Typography>
              </div>
              <div className="w-64">
                <Select
                  value={roomTypeFilter}
                  onChange={(val) => setRoomTypeFilter(val)}
                  label="Filter Room Type"
                >
                  <Option value="all">All Room Types</Option>
                  {roomPerformanceData.map(room => (
                    <Option key={room.code} value={room.code}>{room.type}</Option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Room Performance Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4 bg-gradient-to-r from-green-50 to-green-100">
                <Typography variant="small" color="gray" className="flex items-center gap-1">
                  <HomeModernIcon className="h-4 w-4 text-green-600" />
                  Most Popular Room
                </Typography>
                <Typography variant="h5" color="blue-gray">
                  {mostBookedRoom.type}
                </Typography>
                <Typography variant="small" color="gray">
                  {mostBookedRoom.occupancyRate}% occupancy • {formatZMK(mostBookedRoom.avgPrice)}/night
                </Typography>
              </Card>
              
              <Card className="p-4 bg-gradient-to-r from-amber-50 to-amber-100">
                <Typography variant="small" color="gray" className="flex items-center gap-1">
                  <ChartBarIcon className="h-4 w-4 text-amber-600" />
                  Overall Occupancy
                </Typography>
                <Typography variant="h5" color="blue-gray">
                  {overallOccupancy}%
                </Typography>
                <Typography variant="small" color="gray">
                  {totalBooked} of {totalRooms} rooms booked
                </Typography>
              </Card>
              
              <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100">
                <Typography variant="small" color="gray" className="flex items-center gap-1">
                  <CurrencyDollarIcon className="h-4 w-4 text-blue-600" />
                  Revenue by Room Type
                </Typography>
                <Typography variant="h5" color="blue-gray">
                  {formatZMK(roomPerformanceData.reduce((sum, r) => sum + r.revenue, 0))}
                </Typography>
                <Typography variant="small" color="gray">
                  Highest: {mostBookedRoom.type}
                </Typography>
              </Card>
            </div>

            {/* Room Performance Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-blue-gray-100">
                    <th className="text-left py-3 px-4">
                      <Typography variant="small" color="blue-gray" className="font-bold">Room Type</Typography>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Typography variant="small" color="blue-gray" className="font-bold">Total Rooms</Typography>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Typography variant="small" color="blue-gray" className="font-bold">Booked</Typography>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Typography variant="small" color="blue-gray" className="font-bold">Occupancy Rate</Typography>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Typography variant="small" color="blue-gray" className="font-bold">Avg Price</Typography>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Typography variant="small" color="blue-gray" className="font-bold">Revenue</Typography>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Typography variant="small" color="blue-gray" className="font-bold">Trend</Typography>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Typography variant="small" color="blue-gray" className="font-bold">Status</Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roomPerformanceData
                    .filter(room => roomTypeFilter === "all" || room.code === roomTypeFilter)
                    .map((room, index) => (
                      <tr key={room.code} className="border-b border-blue-gray-50 hover:bg-blue-gray-50/50">
                        <td className="py-3 px-4">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {room.type}
                          </Typography>
                        </td>
                        <td className="py-3 px-4">
                          <Typography variant="small" color="blue-gray">
                            {room.totalRooms}
                          </Typography>
                        </td>
                        <td className="py-3 px-4">
                          <Typography variant="small" color="blue-gray">
                            {room.booked}
                          </Typography>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={room.occupancyRate} 
                              size="sm"
                              color={
                                room.occupancyRate >= 85 ? "green" :
                                room.occupancyRate >= 70 ? "blue" : "amber"
                              }
                            />
                            <Typography variant="small" color="blue-gray" className="font-medium">
                              {room.occupancyRate}%
                            </Typography>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Typography variant="small" color="blue-gray">
                            {formatZMK(room.avgPrice)}
                          </Typography>
                        </td>
                        <td className="py-3 px-4">
                          <Typography variant="small" color="blue-gray" className="font-bold">
                            {formatZMK(room.revenue)}
                          </Typography>
                        </td>
                        <td className="py-3 px-4">
                          <div className={`flex items-center gap-1 ${
                            room.trend.includes('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {room.trend.includes('+') ? (
                              <ArrowUpIcon className="h-3 w-3" />
                            ) : (
                              <ArrowDownIcon className="h-3 w-3" />
                            )}
                            <Typography variant="small" className="font-medium">
                              {room.trend}
                            </Typography>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Chip
                            size="sm"
                            value={room.popular ? "High Demand" : "Normal"}
                            color={room.popular ? "green" : "blue-gray"}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* NEW SECTION: Seasonal Analytics */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seasonal Occupancy Chart */}
        <Card className="lg:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Seasonal Occupancy & Revenue Trends
            </Typography>
            <div className="space-y-4">
              {seasonalData.map((month) => (
                <div key={month.month}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        {month.month}
                      </Typography>
                      {month.occupancy > 85 && (
                        <Chip size="sm" value="Peak" color="green" />
                      )}
                      {month.occupancy < 70 && (
                        <Chip size="sm" value="Low" color="amber" />
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <Typography variant="small" color="blue-gray">
                        {month.occupancy}%
                      </Typography>
                      <Typography variant="small" color="green" className="font-medium">
                        {formatZMK(month.revenue)}
                      </Typography>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={month.occupancy} 
                      size="sm"
                      color={
                        month.occupancy > 85 ? "green" :
                        month.occupancy > 70 ? "blue" : "amber"
                      }
                      className="mb-1"
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex">
                      <div 
                        className="h-full bg-green-500/20" 
                        style={{ width: `${(month.revenue / (268000 * 21)) * 100}%` }}
                      />
                    </div>
                  </div>
                  <Typography variant="small" color="gray" className="text-xs">
                    {month.events}
                  </Typography>
                </div>
              ))}
            </div>
          </CardHeader>
        </Card>

        {/* Peak vs Low Seasons Analysis */}
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Peak vs Low Seasons
            </Typography>
            
            {/* Peak Seasons */}
            <div className="mb-6">
              <Typography variant="h6" color="blue-gray" className="mb-3 flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                Peak Seasons (85%+ occupancy)
              </Typography>
              <div className="space-y-2">
                {peakMonths.map(month => (
                  <div key={month.month} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <div>
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        {month.month}
                      </Typography>
                      <Typography variant="small" color="gray">
                        {month.events}
                      </Typography>
                    </div>
                    <div className="text-right">
                      <Typography variant="small" color="green" className="font-bold">
                        {month.occupancy}%
                      </Typography>
                      <Typography variant="small" color="green">
                        {formatZMK(month.revenue)}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Seasons */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3 flex items-center gap-2">
                <XCircleIcon className="h-5 w-5 text-amber-500" />
                Low Seasons (Below 70%)
              </Typography>
              <div className="space-y-2">
                {lowMonths.map(month => (
                  <div key={month.month} className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
                    <div>
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        {month.month}
                      </Typography>
                      <Typography variant="small" color="gray">
                        {month.events}
                      </Typography>
                    </div>
                    <div className="text-right">
                      <Typography variant="small" color="amber" className="font-bold">
                        {month.occupancy}%
                      </Typography>
                      <Typography variant="small" color="amber">
                        {formatZMK(month.revenue)}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seasonal Strategy Recommendations */}
            <div className="mt-6 p-4 bg-blue-gray-50 rounded-lg">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                📊 Seasonal Strategy
              </Typography>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mt-0.5" />
                  <Typography variant="small" color="blue-gray">
                    <span className="font-bold">Peak Months:</span> Increase rates by 15-20% (Jun-Aug, Dec)
                  </Typography>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowDownIcon className="h-4 w-4 text-amber-500 mt-0.5" />
                  <Typography variant="small" color="blue-gray">
                    <span className="font-bold">Low Months:</span> Corporate packages & staycation deals (Jan-Feb, Nov)
                  </Typography>
                </li>
                <li className="flex items-start gap-2">
                  <CalendarIcon className="h-4 w-4 text-blue-500 mt-0.5" />
                  <Typography variant="small" color="blue-gray">
                    <span className="font-bold">Opportunity:</span> Bridge months (Mar, Oct) need targeted promotions
                  </Typography>
                </li>
              </ul>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Day of Week Analysis */}
      <div className="mb-8">
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Weekly Booking Patterns
            </Typography>
            <div className="grid grid-cols-7 gap-2">
              {dayOfWeekData.map((day) => (
                <div key={day.day} className="text-center">
                  <Typography variant="small" color="blue-gray" className="font-medium mb-2">
                    {day.day.substring(0, 3)}
                  </Typography>
                  <div className="h-32 flex flex-col justify-end">
                    <div 
                      className={`w-full rounded-t-lg ${
                        day.occupancy > 85 ? 'bg-green-500' :
                        day.occupancy > 70 ? 'bg-blue-500' : 'bg-amber-500'
                      }`}
                      style={{ height: `${day.occupancy}%` }}
                    />
                  </div>
                  <Typography variant="small" color="blue-gray" className="mt-2 font-bold">
                    {day.occupancy}%
                  </Typography>
                  <Typography variant="small" color="gray">
                    {formatZMK(day.avgRate)}
                  </Typography>
                </div>
              ))}
            </div>
            
            {/* Weekend Strategy */}
            <div className="mt-6 flex gap-4">
              <Card className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 flex-1">
                <Typography variant="small" color="gray">Weekend Premium</Typography>
                <Typography variant="h5" color="blue-gray">+28%</Typography>
                <Typography variant="small" color="gray">Higher rates on Fri-Sat</Typography>
              </Card>
              <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 flex-1">
                <Typography variant="small" color="gray">Weekday Opportunity</Typography>
                <Typography variant="h5" color="blue-gray">62%</Typography>
                <Typography variant="small" color="gray">Avg Mon-Wed occupancy</Typography>
              </Card>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Room Optimization Opportunities */}
      <div className="mb-8">
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Room Type Optimization Opportunities
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roomOpportunities.map((opportunity, index) => (
                <Card key={index} className="p-4 border border-blue-gray-100">
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    {opportunity.roomType}
                  </Typography>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Typography variant="small" color="gray">Current Rate</Typography>
                      <Typography variant="small" color="blue-gray">{formatZMK(opportunity.currentRate)}</Typography>
                    </div>
                    <div className="flex justify-between">
                      <Typography variant="small" color="gray">Recommended</Typography>
                      <Typography variant="small" color="green" className="font-bold">
                        {opportunity.recommendedAction}
                      </Typography>
                    </div>
                    <div className="flex justify-between">
                      <Typography variant="small" color="gray">Potential Revenue</Typography>
                      <Typography variant="small" color="green" className="font-bold">
                        +{formatZMK(opportunity.potentialRevenue)}/mo
                      </Typography>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Rest of your existing dashboard components... */}
      {/* Revenue vs Cost Chart, Profit Impact Opportunities, etc. */}
    </div>
  );
}

export default Home;
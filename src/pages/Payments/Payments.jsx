import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  PencilIcon,
  UserPlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  CreditCardIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  PrinterIcon,
  EnvelopeIcon,
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

const PAYMENT_TABS = [
  {
    label: "All Payments",
    value: "all",
  },
  {
    label: "Completed",
    value: "paid",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Partial",
    value: "partial",
  },
  {
    label: "Overdue",
    value: "overdue",
  },
];

const TABLE_HEAD = ["Guest", "Room", "Stay Period", "Status", "Payment", "Payment Details", "Actions"];

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
    paymentMethod: "credit_card",
    totalAmount: 1250.00,
    paidAmount: 1250.00,
    paymentDate: "2024-03-10",
    transactionId: "TXN123456",
    specialRequests: "Extra pillows, late checkout",
    id: "G1001",
    billingAddress: "123 Main St, New York, NY 10001",
    invoiceNumber: "INV-2024-001",
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
    paymentMethod: "cash",
    totalAmount: 800.00,
    paidAmount: 800.00,
    paymentDate: "2024-03-14",
    transactionId: "CASH001",
    specialRequests: "Airport pickup",
    id: "G1002",
    billingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    invoiceNumber: "INV-2024-002",
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
    paymentMethod: "bank_transfer",
    totalAmount: 600.00,
    paidAmount: 0.00,
    dueDate: "2024-03-18",
    specialRequests: "High floor, quiet room",
    id: "G1003",
    billingAddress: "789 Pine St, Chicago, IL 60007",
    invoiceNumber: "INV-2024-003",
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
    paymentMethod: "credit_card",
    totalAmount: 2000.00,
    paidAmount: 2000.00,
    paymentDate: "2024-03-15",
    transactionId: "TXN789012",
    specialRequests: "Champagne welcome, roses",
    id: "G1004",
    billingAddress: "321 Beach Blvd, Miami, FL 33101",
    invoiceNumber: "INV-2024-004",
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
    paymentMethod: "credit_card",
    totalAmount: 900.00,
    paidAmount: 300.00,
    paymentDate: "2024-03-01",
    transactionId: "TXN345678",
    dueDate: "2024-03-20",
    specialRequests: "Extra bed, vegetarian meals",
    id: "G1005",
    billingAddress: "567 Cedar Rd, Dallas, TX 75001",
    invoiceNumber: "INV-2024-005",
  },
];

export function Payments() {
  const [guests, setGuests] = useState(initialGuests);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [paymentTab, setPaymentTab] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openInvoiceDialog, setOpenInvoiceDialog] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [dialogMode, setDialogMode] = useState("add");
  const [paymentData, setPaymentData] = useState({
    amount: "",
    method: "credit_card",
    transactionId: "",
    notes: "",
  });
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  // Load payment history from localStorage
  useEffect(() => {
    const savedPayments = localStorage.getItem('paymentHistory');
    if (savedPayments) {
      setPaymentHistory(JSON.parse(savedPayments));
    }
  }, []);

  // Save payment history to localStorage
  useEffect(() => {
    localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
  }, [paymentHistory]);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
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

  const handleOpenPayment = (guest) => {
    setSelectedGuest(guest);
    setPaymentData({
      amount: guest.totalAmount - guest.paidAmount,
      method: "credit_card",
      transactionId: "",
      notes: "",
    });
    setOpenPaymentDialog(true);
  };

  const handleClosePayment = () => {
    setOpenPaymentDialog(false);
    setSelectedGuest(null);
    setPaymentData({
      amount: "",
      method: "credit_card",
      transactionId: "",
      notes: "",
    });
  };

  const handleOpenInvoice = (guest) => {
    setSelectedGuest(guest);
    setOpenInvoiceDialog(true);
  };

  const handleCloseInvoice = () => {
    setOpenInvoiceDialog(false);
    setSelectedGuest(null);
  };

  const handleProcessPayment = () => {
    if (!paymentData.amount || paymentData.amount <= 0) {
      showAlert("Please enter a valid amount", "error");
      return;
    }

    const newPaidAmount = selectedGuest.paidAmount + parseFloat(paymentData.amount);
    const newPaymentStatus = newPaidAmount >= selectedGuest.totalAmount ? "paid" : "partial";

    // Update guest payment info
    setGuests(guests.map(guest =>
      guest.id === selectedGuest.id
        ? {
            ...guest,
            paidAmount: newPaidAmount,
            paymentStatus: newPaymentStatus,
            paymentDate: new Date().toISOString().split('T')[0],
            transactionId: paymentData.transactionId || `TXN${Math.random().toString(36).substr(2, 9)}`,
          }
        : guest
    ));

    // Add to payment history
    const newPayment = {
      id: `PAY${Date.now()}`,
      guestId: selectedGuest.id,
      guestName: selectedGuest.name,
      amount: parseFloat(paymentData.amount),
      method: paymentData.method,
      transactionId: paymentData.transactionId || `TXN${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      notes: paymentData.notes,
      invoiceNumber: selectedGuest.invoiceNumber,
    };
    setPaymentHistory([newPayment, ...paymentHistory]);

    showAlert(`Payment of $${paymentData.amount} processed successfully!`, "success");
    handleClosePayment();
  };

  const handleCheckIn = (guestId) => {
    setGuests(guests.map(guest =>
      guest.id === guestId
        ? { ...guest, status: "checked-in", checkIn: new Date().toISOString().split('T')[0] }
        : guest
    ));
    showAlert("Guest checked in successfully!", "success");
  };

  const handleCheckOut = (guestId) => {
    const guest = guests.find(g => g.id === guestId);
    if (guest.paymentStatus !== "paid") {
      showAlert("Cannot check out: Payment is not complete!", "error");
      return;
    }
    setGuests(guests.map(guest =>
      guest.id === guestId
        ? { ...guest, status: "checked-out", checkOut: new Date().toISOString().split('T')[0] }
        : guest
    ));
    showAlert("Guest checked out successfully!", "success");
  };

  const handleSendInvoice = (guest) => {
    // Simulate sending invoice via email
    showAlert(`Invoice ${guest.invoiceNumber} sent to ${guest.email}`, "success");
  };

  const handlePrintInvoice = (guest) => {
    // Simulate printing invoice
    window.print();
    showAlert("Invoice sent to printer", "info");
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch =
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.roomNumber.includes(searchTerm) ||
      guest.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") {
      if (paymentTab === "all") return matchesSearch;
      return matchesSearch && guest.paymentStatus === paymentTab;
    }
    return matchesSearch && guest.status === activeTab;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "checked-in": return "green";
      case "checked-out": return "blue-gray";
      case "upcoming": return "amber";
      default: return "blue-gray";
    }
  };

  const getPaymentColor = (status) => {
    switch (status) {
      case "paid": return "green";
      case "pending": return "amber";
      case "partial": return "orange";
      case "overdue": return "red";
      default: return "blue-gray";
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "credit_card": return <CreditCardIcon className="h-4 w-4" />;
      case "cash": return <BanknotesIcon className="h-4 w-4" />;
      case "bank_transfer": return <CurrencyDollarIcon className="h-4 w-4" />;
      default: return <CurrencyDollarIcon className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ZMK',
    }).format(amount);
  };

  const calculateNights = (checkIn, checkOut) => {
    return Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
  };

  // Calculate payment statistics
  const paymentStats = {
    totalRevenue: guests.reduce((sum, guest) => sum + guest.paidAmount, 0),
    pendingPayments: guests.reduce((sum, guest) => 
      guest.paymentStatus === "pending" ? sum + guest.totalAmount : sum, 0),
    partialPayments: guests.reduce((sum, guest) => 
      guest.paymentStatus === "partial" ? sum + (guest.totalAmount - guest.paidAmount) : sum, 0),
    totalBookings: guests.length,
  };

  return (
    <>
      {/* Alert Component */}
      {alert.show && (
        <div className="fixed top-4 right-4 z-50 w-96">
          <Alert
            color={alert.type === "success" ? "green" : alert.type === "error" ? "red" : "blue"}
            onClose={() => setAlert({ show: false, message: "", type: "" })}
          >
            {alert.message}
          </Alert>
        </div>
      )}

      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Hotel Payment Management
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Manage guest payments, invoices, and financial transactions
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm" className="flex items-center gap-2">
                <DocumentTextIcon className="h-4 w-4" /> Export Report
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

          {/* Payment Statistics Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <Card className="p-4">
              <Typography variant="small" color="blue-gray" className="font-normal">
                Total Revenue
              </Typography>
              <Typography variant="h4" color="green">
                {formatCurrency(paymentStats.totalRevenue)}
              </Typography>
            </Card>
            <Card className="p-4">
              <Typography variant="small" color="blue-gray" className="font-normal">
                Pending Payments
              </Typography>
              <Typography variant="h4" color="amber">
                {formatCurrency(paymentStats.pendingPayments)}
              </Typography>
            </Card>
            <Card className="p-4">
              <Typography variant="small" color="blue-gray" className="font-normal">
                Outstanding Balance
              </Typography>
              <Typography variant="h4" color="orange">
                {formatCurrency(paymentStats.partialPayments)}
              </Typography>
            </Card>
            <Card className="p-4">
              <Typography variant="small" color="blue-gray" className="font-normal">
                Total Bookings
              </Typography>
              <Typography variant="h4" color="blue">
                {paymentStats.totalBookings}
              </Typography>
            </Card>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col gap-4 w-full md:w-auto">
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
              <Tabs value={paymentTab} className="w-full md:w-max">
                <TabsHeader>
                  {PAYMENT_TABS.map(({ label, value }) => (
                    <Tab
                      key={value}
                      value={value}
                      onClick={() => setPaymentTab(value)}
                    >
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
            </div>
            <div className="w-full md:w-72">
              <Input
                label="Search guests, rooms, invoices..."
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
                const balance = guest.totalAmount - guest.paidAmount;

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
                            {guest.email}
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
                          In: {formatDate(guest.checkIn)}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          Out: {formatDate(guest.checkOut)}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {calculateNights(guest.checkIn, guest.checkOut)} nights
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
                      <div className="flex flex-col gap-1">
                        <Typography variant="small" className="font-normal">
                          Total: {formatCurrency(guest.totalAmount)}
                        </Typography>
                        <Typography variant="small" className="font-normal">
                          Paid: {formatCurrency(guest.paidAmount)}
                        </Typography>
                        {balance > 0 && (
                          <Typography variant="small" color="red" className="font-normal">
                            Balance: {formatCurrency(balance)}
                          </Typography>
                        )}
                        <Typography variant="small" className="font-normal opacity-70 flex items-center gap-1">
                          {getPaymentMethodIcon(guest.paymentMethod)}
                          {guest.paymentMethod?.replace('_', ' ')}
                        </Typography>
                        {guest.transactionId && (
                          <Typography variant="small" className="font-normal opacity-70">
                            TXN: {guest.transactionId}
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
                          <Tooltip content="Process Payment">
                            <IconButton
                              variant="text"
                              color="green"
                              onClick={() => handleOpenPayment(guest)}
                            >
                              <CurrencyDollarIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="View Invoice">
                            <IconButton
                              variant="text"
                              color="blue"
                              onClick={() => handleOpenInvoice(guest)}
                            >
                              <DocumentTextIcon className="h-4 w-4" />
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
                        <div className="flex gap-2">
                          <Tooltip content="Send Invoice">
                            <IconButton
                              variant="text"
                              color="blue"
                              size="sm"
                              onClick={() => handleSendInvoice(guest)}
                            >
                              <EnvelopeIcon className="h-3 w-3" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Print Invoice">
                            <IconButton
                              variant="text"
                              color="blue-gray"
                              size="sm"
                              onClick={() => handlePrintInvoice(guest)}
                            >
                              <PrinterIcon className="h-3 w-3" />
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
                      <Typography variant="small" color="gray">Invoice: {selectedGuest.invoiceNumber}</Typography>
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
                      <Typography variant="small" color="gray">Payment Status</Typography>
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={selectedGuest.paymentStatus}
                        color={getPaymentColor(selectedGuest.paymentStatus)}
                      />
                    </div>
                    <div>
                      <Typography variant="small" color="gray">Total Amount</Typography>
                      <Typography>{formatCurrency(selectedGuest.totalAmount)}</Typography>
                    </div>
                    <div>
                      <Typography variant="small" color="gray">Paid Amount</Typography>
                      <Typography>{formatCurrency(selectedGuest.paidAmount)}</Typography>
                    </div>
                    <div>
                      <Typography variant="small" color="gray">Payment Method</Typography>
                      <Typography className="flex items-center gap-1">
                        {getPaymentMethodIcon(selectedGuest.paymentMethod)}
                        {selectedGuest.paymentMethod?.replace('_', ' ')}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="small" color="gray">Transaction ID</Typography>
                      <Typography>{selectedGuest.transactionId || 'N/A'}</Typography>
                    </div>
                  </div>
                  {selectedGuest.specialRequests && (
                    <div>
                      <Typography variant="small" color="gray">Special Requests</Typography>
                      <Typography>{selectedGuest.specialRequests}</Typography>
                    </div>
                  )}
                  {selectedGuest.billingAddress && (
                    <div>
                      <Typography variant="small" color="gray">Billing Address</Typography>
                      <Typography>{selectedGuest.billingAddress}</Typography>
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
                <Input label="Total Amount" type="number" defaultValue={selectedGuest?.totalAmount} />
                <Input label="Paid Amount" type="number" defaultValue={selectedGuest?.paidAmount} />
                <Select label="Payment Method" value={selectedGuest?.paymentMethod}>
                  <Option value="credit_card">Credit Card</Option>
                  <Option value="cash">Cash</Option>
                  <Option value="bank_transfer">Bank Transfer</Option>
                </Select>
                <Input label="Transaction ID" defaultValue={selectedGuest?.transactionId} />
                <div className="col-span-2">
                  <Input label="Billing Address" defaultValue={selectedGuest?.billingAddress} />
                </div>
                <div className="col-span-2">
                  <Textarea label="Special Requests" defaultValue={selectedGuest?.specialRequests} />
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

      {/* Payment Dialog */}
      <Dialog open={openPaymentDialog} handler={handleClosePayment} size="sm">
        <DialogHeader>Process Payment</DialogHeader>
        <DialogBody divider>
          {selectedGuest && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <Typography variant="h6">{selectedGuest.name}</Typography>
                <Typography variant="small" color="gray">Invoice: {selectedGuest.invoiceNumber}</Typography>
              </div>
              <div className="bg-blue-gray-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <Typography>Total Amount:</Typography>
                  <Typography className="font-bold">{formatCurrency(selectedGuest.totalAmount)}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography>Paid Amount:</Typography>
                  <Typography className="font-bold">{formatCurrency(selectedGuest.paidAmount)}</Typography>
                </div>
                <div className="flex justify-between text-red-600">
                  <Typography>Balance Due:</Typography>
                  <Typography className="font-bold">
                    {formatCurrency(selectedGuest.totalAmount - selectedGuest.paidAmount)}
                  </Typography>
                </div>
              </div>
              <Input
                label="Payment Amount"
                type="number"
                value={paymentData.amount}
                onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                icon={<CurrencyDollarIcon className="h-5 w-5" />}
              />
              <Select
                label="Payment Method"
                value={paymentData.method}
                onChange={(val) => setPaymentData({ ...paymentData, method: val })}
              >
                <Option value="credit_card">Credit Card</Option>
                <Option value="cash">Cash</Option>
                <Option value="bank_transfer">Bank Transfer</Option>
              </Select>
              <Input
                label="Transaction ID (Optional)"
                value={paymentData.transactionId}
                onChange={(e) => setPaymentData({ ...paymentData, transactionId: e.target.value })}
              />
              <Textarea
                label="Notes (Optional)"
                value={paymentData.notes}
                onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
              />
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleClosePayment} className="mr-1">
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleProcessPayment}>
            Process Payment
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Invoice Dialog */}
      <Dialog open={openInvoiceDialog} handler={handleCloseInvoice} size="lg">
        <DialogHeader>Invoice {selectedGuest?.invoiceNumber}</DialogHeader>
        <DialogBody divider>
          {selectedGuest && (
            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="flex justify-between">
                <div>
                  <Typography variant="h5" color="blue-gray">Hotel Name</Typography>
                  <Typography variant="small">123 Hotel Street, City, State 12345</Typography>
                  <Typography variant="small">Phone: (123) 456-7890</Typography>
                  <Typography variant="small">Email: reservations@hotel.com</Typography>
                </div>
                <div className="text-right">
                  <Typography variant="h6" color="blue-gray">INVOICE</Typography>
                  <Typography variant="small">Invoice #: {selectedGuest.invoiceNumber}</Typography>
                  <Typography variant="small">Date: {formatDate(new Date().toISOString())}</Typography>
                  <Typography variant="small">Due Date: {selectedGuest.dueDate || formatDate(selectedGuest.checkIn)}</Typography>
                </div>
              </div>

              {/* Bill To */}
              <div>
                <Typography variant="h6" color="blue-gray">Bill To:</Typography>
                <Typography>{selectedGuest.name}</Typography>
                <Typography>{selectedGuest.email}</Typography>
                <Typography>{selectedGuest.phone}</Typography>
                <Typography>{selectedGuest.billingAddress}</Typography>
              </div>

              {/* Invoice Items */}
              <table className="w-full">
                <thead>
                  <tr className="border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-right">Nights</th>
                    <th className="p-2 text-right">Rate/Night</th>
                    <th className="p-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">
                      {selectedGuest.roomType} - Room {selectedGuest.roomNumber}
                      <Typography variant="small" color="gray">
                        Check-in: {formatDate(selectedGuest.checkIn)} | Check-out: {formatDate(selectedGuest.checkOut)}
                      </Typography>
                    </td>
                    <td className="p-2 text-right">{calculateNights(selectedGuest.checkIn, selectedGuest.checkOut)}</td>
                    <td className="p-2 text-right">
                      {formatCurrency(selectedGuest.totalAmount / calculateNights(selectedGuest.checkIn, selectedGuest.checkOut))}
                    </td>
                    <td className="p-2 text-right">{formatCurrency(selectedGuest.totalAmount)}</td>
                  </tr>
                  {selectedGuest.specialRequests && (
                    <tr>
                      <td colSpan="4" className="p-2">
                        <Typography variant="small" color="gray">Special Requests: {selectedGuest.specialRequests}</Typography>
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="border-t border-blue-gray-100">
                  <tr>
                    <td colSpan="3" className="p-2 text-right font-bold">Subtotal:</td>
                    <td className="p-2 text-right">{formatCurrency(selectedGuest.totalAmount)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="p-2 text-right font-bold">Tax (10%):</td>
                    <td className="p-2 text-right">{formatCurrency(selectedGuest.totalAmount * 0.1)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="p-2 text-right font-bold">Total:</td>
                    <td className="p-2 text-right font-bold">{formatCurrency(selectedGuest.totalAmount * 1.1)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="p-2 text-right font-bold">Paid:</td>
                    <td className="p-2 text-right">{formatCurrency(selectedGuest.paidAmount)}</td>
                  </tr>
                  <tr className="text-red-600">
                    <td colSpan="3" className="p-2 text-right font-bold">Balance Due:</td>
                    <td className="p-2 text-right font-bold">
                      {formatCurrency((selectedGuest.totalAmount * 1.1) - selectedGuest.paidAmount)}
                    </td>
                  </tr>
                </tfoot>
              </table>

              {/* Payment History */}
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-2">Payment History</Typography>
                <table className="w-full">
                  <thead>
                    <tr className="border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Method</th>
                      <th className="p-2 text-left">Transaction ID</th>
                      <th className="p-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory
                      .filter(p => p.guestId === selectedGuest.id)
                      .map((payment, index) => (
                        <tr key={index}>
                          <td className="p-2">{formatDate(payment.date)}</td>
                          <td className="p-2">{payment.method.replace('_', ' ')}</td>
                          <td className="p-2">{payment.transactionId}</td>
                          <td className="p-2 text-right">{formatCurrency(payment.amount)}</td>
                        </tr>
                      ))}
                    {paymentHistory.filter(p => p.guestId === selectedGuest.id).length === 0 && (
                      <tr>
                        <td colSpan="4" className="p-2 text-center text-gray-500">
                          No payment records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="text-center text-gray-500 text-sm">
                <p>Thank you for choosing our hotel!</p>
                <p>This is a computer generated invoice. No signature required.</p>
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="blue" onClick={() => handleSendInvoice(selectedGuest)}>
            <EnvelopeIcon className="h-4 w-4 mr-2 inline" /> Send Email
          </Button>
          <Button variant="outlined" color="blue-gray" onClick={() => handlePrintInvoice(selectedGuest)}>
            <PrinterIcon className="h-4 w-4 mr-2 inline" /> Print
          </Button>
          <Button variant="gradient" color="green" onClick={handleCloseInvoice}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Payments;
import { element } from "prop-types";
import React from "react";
import newMembers from "./views/newMembers";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(
  () => import("./views/theme/typography/Typography")
);

// Base
const Accordion = React.lazy(() => import("./views/base/accordion/Accordion"));
const Breadcrumbs = React.lazy(
  () => import("./views/base/breadcrumbs/Breadcrumbs")
);
const Cards = React.lazy(() => import("./views/base/cards/Cards"));
const Carousels = React.lazy(() => import("./views/base/carousels/Carousels"));
const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));
const ListGroups = React.lazy(
  () => import("./views/base/list-groups/ListGroups")
);
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Paginations = React.lazy(
  () => import("./views/base/paginations/Paginations")
);
const Placeholders = React.lazy(
  () => import("./views/base/placeholders/Placeholders")
);
const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
const Progress = React.lazy(() => import("./views/base/progress/Progress"));
const Spinners = React.lazy(() => import("./views/base/spinners/Spinners"));
const Tabs = React.lazy(() => import("./views/base/tabs/Tabs"));
const Tables = React.lazy(() => import("./views/base/tables/Tables"));
const Tooltips = React.lazy(() => import("./views/base/tooltips/Tooltips"));

// Buttons
const Buttons = React.lazy(() => import("./views/buttons/buttons/Buttons"));
const ButtonGroups = React.lazy(
  () => import("./views/buttons/button-groups/ButtonGroups")
);
const Dropdowns = React.lazy(
  () => import("./views/buttons/dropdowns/Dropdowns")
);

//Forms
const ChecksRadios = React.lazy(
  () => import("./views/forms/checks-radios/ChecksRadios")
);
const FloatingLabels = React.lazy(
  () => import("./views/forms/floating-labels/FloatingLabels")
);
const FormControl = React.lazy(
  () => import("./views/forms/form-control/FormControl")
);
const InputGroup = React.lazy(
  () => import("./views/forms/input-group/InputGroup")
);
const Layout = React.lazy(() => import("./views/forms/layout/Layout"));
const Range = React.lazy(() => import("./views/forms/range/Range"));
const Select = React.lazy(() => import("./views/forms/select/Select"));
const Validation = React.lazy(
  () => import("./views/forms/validation/Validation")
);

const Charts = React.lazy(() => import("./views/charts/Charts"));

// Icons
const CoreUIIcons = React.lazy(
  () => import("./views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));

// Notifications
const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
const Toasts = React.lazy(() => import("./views/notifications/toasts/Toasts"));

const Widgets = React.lazy(() => import("./views/widgets/Widgets"));

//Resgistration

const Rejoining = React.lazy(
  () => import("./views/Rejoining/Rejoining")
);

//Visitors

const Visitors = React.lazy(
  () => import("./views/Registration/Visitors/Visitors")
);

//Form

const RegistrationForm = React.lazy(
  () => import("./views/Registration/Registration Form/Registration Form")
);

//Children Below 11 years
const Kids = React.lazy(
  () => import("./views/Registration/Kids/Children Below")
);

//Members
const Members = React.lazy(() => import("./views/Members"));


const Transfer = React.lazy(() => import("./views/Transfer"));
const Barred = React.lazy(() => import("./views/Barred"));

//Reports

const Reports = React.lazy(() => import("./views/Reports/Reports"));

//Employees

const Employees = React.lazy(() => import("./views/Employees"));

//Elders
const Parish = React.lazy(() => import("./views/Parish"));
const Join = React.lazy(() => import("./views/Rejoining/Join"));

const Elders = React.lazy(() => import("./views/Elders"));

const holyCommunion = React.lazy(() => import("./views/holyCommunion"));

//Districts

const Districts = React.lazy(() => import("./views/newMembers"));

//
const Status = React.lazy(() => import("./views/Status"));

const ServiceRequest = React.lazy(()=> import("./views/ServiceRequest/ServiceRequest"))

const memberFeedBack = React.lazy(()=> import("./views/memberFeedback/MemberFeedback"))

const DeathNotification = React.lazy(()=>import("./views/DeathNotification"))

const DeathNotificationRegister = React.lazy(()=>import("./views/DeathNotificationRegister"))

const EmployeeRegistration = React.lazy(()=>import("./views/EmployeeRegistration"))

const Attendance = React.lazy(()=>import("./views/Attendance"))

const Readmission = React.lazy(()=>import("./views/Readmission"))

const AwaitingConfirmation = React.lazy(()=>import('./views/AwaitingConfirmation'));

const Messages = React.lazy(()=>import("./views/Messages"))

const PostMessages = React.lazy(()=>import("./views/PostMessage"))

const MemberInformation = React.lazy(()=>import("./views/MemberInformation"))

const AwaitingBaptism = React.lazy(()=>import("./views/AwaitingBaptism"))

const AddMember = React.lazy(()=>import("./views/AddMember"))

const ScheduleMeeting = React.lazy(()=>import("./views/ScheduleMeeting"))

const Minister = React.lazy(()=>import("./views/Minister"))

const AddMinister = React.lazy(()=>import("./views/AddMinister"))

const CardNumberUpdate = React.lazy(()=>import("./views/CardNumberUpdate"))

const Appointments = React.lazy(()=>import("./views/Appointments"))

const EvangelistAppointment = React.lazy(()=>import("./views/EvangelistAppointment/EvangelistAppointment"))

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  //{ path: "/registration", name: "Registration", element: Registration },
  { path: "/reports", name: "Reports", element: Reports },
  { path: "/employees", name: "Employees", element: Employees },
  { path: "/elders", name: "Elders", element: Elders },
  { path: "/newMembers", name: "newMembers", element: newMembers},
  { path: "/Parish", name: "Parish", element: Parish },
  { path: "/Join", name: "Join", element: Join },
  { path: "/status", name: "Status", element: Status },
  {path: "/Readmission", name:"Readmission", element: Readmission},
  {path: "/AwaitingConfirmation", name:"AwaitingConfirmation", element: AwaitingConfirmation},

  {path: "/messages", name:"Messages", element: Messages},
  {path: "/postmessages", name:"PostMessages ", element: PostMessages },



  { path: "/members", name: "New Applicant", element: Members },
 // { path: "/RegularMembers", name: "Regular Members", element: Registration },
  { path: "/Visitors", name: "Visitors", element: Visitors },
  { path: "/Kids", name: "Children Below", element: Kids},
  { path: "/Rejoining", name: "Rejoining", element: Rejoining},
  { path: "/holyCommunion", name: "holy Communion", element: holyCommunion},
  { path: "/Transfer", name: "Transfer", element: Transfer},
  { path: "/Barred", name: "Barred", element: Barred},

  { path:"/MemberFeedBack", name:"memberFeedBack", element: memberFeedBack },

  { path:"/MemberInformation", name:"MemberInformation", element: MemberInformation },

  { path:"/AwaitingBaptism", name:"AwaitingBaptism", element: AwaitingBaptism },

  //Minister
  { path:"/Minister", name:"Minister", element: Minister },
  { path:"/AddMinister", name:"AddMinister", element: AddMinister },
  { path:"/CardNumberUpdate", name:"CardNumberUpdate", element: CardNumberUpdate },
  { path:"/Appointments", name:"Appointments", element: Appointments },
  
  

  {
    path: "/RegistrationForm",
    name: "Registration Form",
    element: RegistrationForm,
  },

  
  {path: "/ServiceRequest", name: "ServiceRequest", element: ServiceRequest },
  {path:"/DeathNotification", name: "DeathNotification", element: DeathNotification},
  {path:"/DeathNotificationRegister", name: "DeathNotificationRegister", element: DeathNotificationRegister},
  {path:"/EmployeeRegistration",name:"EmployeeRegistration", element: EmployeeRegistration},
  {path:"/Attendance",name:"Attendance", element: Attendance},

  {path:"/AddMember",name:"AddMember", element: AddMember}, 

  {path:"/ScheduleMeeting",name:"ScheduleMeeting", element: ScheduleMeeting}, 

  {path: "/EvangelistAppointment", name: "EvangelistAppointment", element: EvangelistAppointment },

  { path: "/theme", name: "Theme", element: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", element: Colors },
  { path: "/theme/typography", name: "Typography", element: Typography },
  { path: "/base", name: "Base", element: Cards, exact: true },
  { path: "/base/accordion", name: "Accordion", element: Accordion },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", element: Breadcrumbs },
  { path: "/base/cards", name: "Cards", element: Cards },
  { path: "/base/carousels", name: "Carousel", element: Carousels },
  { path: "/base/collapses", name: "Collapse", element: Collapses },
  { path: "/base/list-groups", name: "List Groups", element: ListGroups },
  { path: "/base/navs", name: "Navs", element: Navs },
  { path: "/base/paginations", name: "Paginations", element: Paginations },
  { path: "/base/placeholders", name: "Placeholders", element: Placeholders },
  { path: "/base/popovers", name: "Popovers", element: Popovers },
  { path: "/base/progress", name: "Progress", element: Progress },
  { path: "/base/spinners", name: "Spinners", element: Spinners },
  { path: "/base/tabs", name: "Tabs", element: Tabs },
  { path: "/base/tables", name: "Tables", element: Tables },
  { path: "/base/tooltips", name: "Tooltips", element: Tooltips },
  { path: "/buttons", name: "Buttons", element: Buttons, exact: true },
  { path: "/buttons/buttons", name: "Buttons", element: Buttons },
  { path: "/buttons/dropdowns", name: "Dropdowns", element: Dropdowns },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    element: ButtonGroups,
  },
  { path: "/charts", name: "Charts", element: Charts },
  { path: "/forms", name: "Forms", element: FormControl, exact: true },
  { path: "/forms/form-control", name: "Form Control", element: FormControl },
  { path: "/forms/select", name: "Select", element: Select },
  {
    path: "/forms/checks-radios",
    name: "Checks & Radios",
    element: ChecksRadios,
  },
  { path: "/forms/range", name: "Range", element: Range },
  { path: "/forms/input-group", name: "Input Group", element: InputGroup },
  {
    path: "/forms/floating-labels",
    name: "Floating Labels",
    element: FloatingLabels,
  },
  { path: "/forms/layout", name: "Layout", element: Layout },
  { path: "/forms/validation", name: "Validation", element: Validation },
  { path: "/icons", exact: true, name: "Icons", element: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", element: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", element: Flags },
  { path: "/icons/brands", name: "Brands", element: Brands },
  {
    path: "/notifications",
    name: "Notifications",
    element: Alerts,
    exact: true,
  },
  { path: "/notifications/alerts", name: "Alerts", element: Alerts },
  { path: "/notifications/badges", name: "Badges", element: Badges },
  { path: "/notifications/modals", name: "Modals", element: Modals },
  { path: "/notifications/toasts", name: "Toasts", element: Toasts },
  { path: "/widgets", name: "Widgets", element: Widgets },
];

export default routes;

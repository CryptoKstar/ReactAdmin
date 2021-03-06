import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import LanguageIcon from '@mui/icons-material/Language';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import PaymentIcon from '@mui/icons-material/Payment';

const sidebarConfig = [
  {
    title: 'DASHBOARD',
    path: '/app',
    icon: <DashboardIcon/>
  },
  {
    title: 'COMPANY',
    path: '/company',
    icon: <BusinessIcon/>,
    children:[
      {
        title: 'SITES',
        path: '/sites',
        icon: <LanguageIcon/>,
      },
      {
        title: 'PAYMENT METHODS',
        path: '/paymentmethods',
        icon: <PaymentIcon/>,
      },
      {
        title:"TRANSACTIONS",
        path: '/transactions',
        icon: <AccountBalanceIcon/>
      },
      {
        title:"SUBSCRIPTIONS",
        path: '/subscriptions',
        icon: <SubscriptionsIcon/>
      }
    ]
  },
  {
    title: 'PLATFORM MODULES',
    path: '/platform',
    icon: <ViewModuleIcon/>
  },
  {
    title: 'TICKETS',
    path: '/tickets',
    icon: <AirplaneTicketIcon/>
  },
  {
    title: 'HELP',
    path: '/help',
    icon: <LiveHelpIcon/>
  }
];

export default sidebarConfig;

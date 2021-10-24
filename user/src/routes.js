import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import Company from './pages/Company';
import Help from './pages/Help';
import Platform from './pages/Platform';
import Sites from './pages/Sites';
import Subscriptions from './pages/Subscriptions';
import Tickets from './pages/Tickets';
import CreateCompany from './pages/CreateCompany';
import Transactions from './pages/Transactions';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Login />,
      children: [
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'company', element: <Company /> },
        { path: 'newcompany', element: <CreateCompany /> },
        { path: 'help', element: <Help /> },
        { path: 'tickets', element: <Tickets /> },
        { path: 'transactions', element: <Transactions /> },
        { path: 'platform', element: <Platform /> },
        { path: 'sites', element: <Sites /> },
        { path: 'subscriptions', element: <Subscriptions /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

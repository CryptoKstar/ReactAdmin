

import { Switch, Route } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
// import LogoOnlyLayout from './layouts/LogoOnlyLayout';
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
import CompanyDetails from './pages/CompanyDetails';
import SiteDetails from './pages/SiteDetails';
import SubscriptionsDetails from './pages/SubscriptionsDetails';
import TransactionsDetails from './pages/TransactionsDetails';
import PaymentMethods from './pages/PaymentMethods';
import CreatePayment from './pages/CreatePayment';
import PaymentDetails from './pages/PaymentDetails';
import Localization from './pages/Localization'
import CreateLocalization from './pages/CreateLocalization'
import LocalizationDetails from './pages/LocalizationDetails'

export default function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/login" component={Login} exact />
      <DashboardLayout>
        <Route path="/app" component={DashboardApp} exact />
        <Route path="/companydetails" component={CompanyDetails} exact />
        <Route path="/company" component={Company} exact />
        <Route path="/newcompany" component={CreateCompany} exact />
        <Route path="/help" component={Help} exact />
        <Route path="/tickets" component={Tickets} exact />
        <Route path="/transactions" component={Transactions} exact />
        <Route path="/platform" component={Platform} exact />
        <Route path="/sites" component={Sites} exact />
        <Route path="/subscriptions" component={Subscriptions} exact />
        <Route path="/user" component={User} exact />
        <Route path="/products" component={Products} exact />
        <Route path="/blog" component={Blog} exact />
        <Route path="/paymentmethods" component={PaymentMethods} exact />
        <Route path="/sitedetails/:id" component={SiteDetails} exact />
        <Route path="/subscriptionsdetails/:id" component={SubscriptionsDetails} exact />
        <Route path="/transactionsdetails/:id" component={TransactionsDetails} exact />
        <Route path="/newpayment" component={CreatePayment} exact />
        <Route path="/paymentdetails/:id" component={PaymentDetails} exact />
        <Route path="/localization/:id" component={Localization} exact />
        <Route path="/createLocalization/:id" component={CreateLocalization} exact />
        <Route path="/localizationDetails/:id" component={LocalizationDetails} exact />
        {/* <Route path="*" component={NotFound} /> */}

      </DashboardLayout>
    </Switch>
  )
}
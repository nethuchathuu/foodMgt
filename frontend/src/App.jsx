import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Home from './components/home/home';
import About from './components/about/about';
import FoodOffers from './components/offers/foodOffers';
import DonateFood from './components/donate/donateFood';
import Faq from './components/faq/faq';
import SignupBefore from './components/signup/signupBefore';
import SignupAfter from './components/signup/signupAfter';
import SignupPerson from './components/signup/signupP/signupPerson';
import SignupOrg from './components/signup/signupO/signupOrg';
import SignupOrgGard from './components/signup/signupO/signupOrgGard';
import SignupRestaurants from './components/signup/signupRestaurants/signupRestaurents';
import SignupRestOwner from './components/signup/signupRestaurants/signupRestOwner';
import Signin from './components/signin/signin';
import AdminLogin from './components/admin/adminLogin';
import Admin from './components/admin/admin';
import Dashboard from './components/admin/dashboard/dashboard';
import RestApprovel from './components/admin/restApprovel/restapprovel';
import ViewRestDetails from './components/admin/restApprovel/viewRestDetails';
import RestaurantDashboard from './components/resturant/dashboard';
import ReceiverDashboard from './components/receiver/home';
import BrowseFood from './components/receiver/browseFood/browseFood';
import DisplayFood from './components/receiver/browseFood/displayFood';
import OrderFood from './components/receiver/browseFood/orderFood';
import MyOrders from './components/receiver/myOrders/myOrders';
import DetailsOrder from './components/receiver/myOrders/detailsOrder';
import MyRequests from './components/receiver/myRequests/myRequests';
import DetailsRequest from './components/receiver/myRequests/detailsRequest';
import './index.css';

const AppLayout = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname.startsWith('/signup') || location.pathname.startsWith('/signin') || location.pathname.includes('dashboard') || location.pathname.startsWith('/receiver') || location.pathname.startsWith('/admin');

  return (
    <div className="font-sans bg-[#F8F8F6] min-h-screen text-[#1F5E2A] selection:bg-[#A7D63B] selection:text-[#1F5E2A] scroll-smooth flex flex-col">
      {!isAuthRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/offers" element={<FoodOffers />} />
          <Route path="/donate" element={<DonateFood />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/signup" element={<SignupBefore />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup-person" element={<SignupPerson />} />
          <Route path="/signup-org" element={<SignupOrg />} />
          <Route path="/signup-org-guardian" element={<SignupOrgGard />} />
          <Route path="/signup-after" element={<SignupAfter />} />
          <Route path="/signup/signupAfter" element={<SignupAfter />} />
          <Route path="/signup/restaurant" element={<SignupRestaurants />} />
          <Route path="/signup/restaurant/owner" element={<SignupRestOwner />} />
          <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="restaurants" element={<RestApprovel />} />
            <Route path="restaurants/:id" element={<ViewRestDetails />} />
            <Route path="organizations" element={<div>Organizations Content</div>} />
            <Route path="users" element={<div>Users Content</div>} />
            <Route path="foods" element={<div>Foods Content</div>} />
            <Route path="orders" element={<div>Orders Content</div>} />
            <Route path="donations" element={<div>Donations Content</div>} />
          </Route>
          
          {/* Receiver Routes */}
          <Route path="/receiver/home" element={<ReceiverDashboard />} />
          <Route path="/receiver/foods" element={<BrowseFood />} />
          <Route path="/receiver/food/:id" element={<DisplayFood />} />
          <Route path="/receiver/order/:id" element={<OrderFood />} />
          <Route path="/receiver/orders" element={<MyOrders />} />
          <Route path="/receiver/orders/:id" element={<DetailsOrder />} />
          <Route path="/receiver/requests" element={<MyRequests />} />
          <Route path="/receiver/requests/:id" element={<DetailsRequest />} />
          
          {/* Default receiver route to home */}
          <Route path="/receiver/*" element={<ReceiverDashboard />} />
          
          {/* Add a placeholder route for requester dashboard if it doesn't exist yet */}
          <Route path="/requester-dashboard" element={<Home />} />
        </Routes>
      </main>
      {!isAuthRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;

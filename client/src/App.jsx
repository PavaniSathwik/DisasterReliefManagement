import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ResponsiveAppBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import EmergencyContacts from "./components/emergencycontacts/emergencycontacts";
import AdminLogin from "./components/adminLogin/adminlogin";
import AdminHome from "./components/admin/home";
import AdminNavbar from "./components/admin/AdminNavbar";
import AdminDepartment from "./components/admin/departmentadd";
import AdminTeamMember from "./components/admin/deptteammemadd";
import AdminDisclaimer from "./components/admin/disclamerandalert";
import AdminUserManagement from "./components/admin/usermanagment";
import AdminVolunteerApproval from "./components/admin/volunteerallotment";
import AdminDonate from "./components/admin/Admindonate";
import Adminfeedback from "./components/admin/feedback";
// User Components
import UserHome from "./components/user/Home";
import UserNavBar from "./components/user/NavBar";
import UserRequestHelp from "./components/user/request-help";
import UserDonate from "./components/user/donate";
import UserAnnouncements from "./components/user/announcements";
import UserEmergencycontacts from "./components/user/emergency-contacts";
import UserVolunteer from "./components/user/volunteer";

import "bootstrap/dist/css/bootstrap.min.css";

// Check if user is logged in
const isAuthenticated = () => !!localStorage.getItem("token");

// Check if logged-in user is an admin
const isAdmin = () => localStorage.getItem("isAdmin") === "true";

// Public Layout (for general users)
const PublicLayout = ({ children }) => (
  <>
    <ResponsiveAppBar />
    {children}
    <Footer />
  </>
);

// User Layout (for logged-in users)
const UserLayout = ({ children }) => (
  <>
    <UserNavBar />
    {children}
    <Footer />
  </>
);

// Admin Layout (only for admins)
const AdminLayout = ({ children }) => {
  const location = useLocation();
  const [admin, setAdmin] = useState(isAdmin());

  useEffect(() => {
    setAdmin(isAdmin());
  }, [location.pathname]);

  if (!admin) return <Navigate to="/admin-login" replace />;
  
  return (
    <>
      <AdminNavbar />
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
        <Route path="/emergency-contacts" element={<PublicLayout><EmergencyContacts /></PublicLayout>} />
        <Route path="/admin-login" element={<PublicLayout><AdminLogin /></PublicLayout>} />
        {/* User Routes (Only for Authenticated Users) */}
        {isAuthenticated() ? (
          <>
            <Route path="/user/home" element={<UserLayout><UserHome /></UserLayout>} />
            <Route path="/user/request-help" element={<UserLayout><UserRequestHelp /></UserLayout>} />
            <Route path="/user/donate" element={<UserLayout><UserDonate /></UserLayout>} />
            <Route path="/user/announcements" element={<UserLayout><UserAnnouncements /></UserLayout>} />
            <Route path="/user/emergency-contacts" element={<UserLayout><UserEmergencycontacts/></UserLayout>}/>
            <Route path="/user/volunteer" element={<UserLayout><UserVolunteer/></UserLayout>}/>

          </>
        ) : (
          <Route path="/user/*" element={<Navigate to="/login" replace />} />
        )}

        {/* Admin Routes (Only for Admins) */}
        {isAdmin() ? (
          <>
            <Route path="/admin/home" element={<AdminLayout><AdminHome /></AdminLayout>} />
            <Route path="/admin/departmentadd" element={<AdminLayout><AdminDepartment /></AdminLayout>} />
            <Route path="/admin/dept-team-member" element={<AdminLayout><AdminTeamMember /></AdminLayout>} />
            <Route path="/admin/disclaimer-alert" element={<AdminLayout><AdminDisclaimer /></AdminLayout>} />
            <Route path="/admin/user-management" element={<AdminLayout><AdminUserManagement /></AdminLayout>} />
            <Route path="/admin/volunteerallotment" element={<AdminLayout><AdminVolunteerApproval /></AdminLayout>} />
            <Route path="/admin/admin-donate" element={<AdminLayout><AdminDonate /></AdminLayout>} />
            <Route path="/admin/feedback" element={<AdminLayout><Adminfeedback /></AdminLayout>} />


          </>
        ) : (
          <Route path="/admin/*" element={<Navigate to="/admin-login" replace />} />
        )}

        {/* Redirect all unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

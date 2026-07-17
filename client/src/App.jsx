import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateJob from "./pages/CreateJob";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import MyApplications from "./pages/MyApplications";
import Applicants from "./pages/Applicants";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import EditJob from "./pages/EditJob";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
export default function App() {
  return (

    <><Navbar />
    
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/job/:id" element={<JobDetails />} />

      {/* Candidate Protected */}
      <Route
        path="/apply/:id"
        element={
          <ProtectedRoute>
            <ApplyJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-applications"
        element={
          <ProtectedRoute>
            <MyApplications />
          </ProtectedRoute>
        }
      />
      
      {/* Recruiter Protected */}
      <Route
        path="/recruiter"
        element={
          <ProtectedRoute recruiterOnly={true}>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-job"
        element={
          <ProtectedRoute recruiterOnly={true}>
            <CreateJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applicants/:id"
        element={
          <ProtectedRoute recruiterOnly={true}>
            <Applicants />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
/>
      {/* 404 */}
      <Route path="*" element={<NotFound />} />

      <Route path="/edit-job/:id" element={<ProtectedRoute recruiterOnly={true}><EditJob/></ProtectedRoute>
  }
/>
    </Routes>
    <Footer />

    </>
  );
}
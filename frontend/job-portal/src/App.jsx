import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,

} from "react-router-dom"
import { Toaster } from "react-hot-toast"
import LandingPage from "./LandingPage/LandingPage"
import SignUp from "./pages/Auth/SignUp"
import Login from "./pages/Auth/Login"
import JobSeekerDashboards from "./pages/JobSeeker/JobSeekerDashboards"
import JobDetails from "./pages/JobSeeker/JobDetails"
import SavedJobs from "./pages/JobSeeker/SavedJobs"
import UserProfile from "./pages/JobSeeker/UserProfile"
import EmployerDasboard from "./pages/Employer/EmployerDasboard"
import JobPostingForm from "./pages/Employer/JobPostingForm"
import ManageJob from "./pages/Employer/ManageJob"
import ApplicationViewer from "./pages/Employer/ApplicationViewer"
import EmployerProfilePage from "./pages/Employer/EmployerProfilePage"
import ProtectedRoutes from "./routes/ProtectedRoutes"

const App =() =>{
  return(
    <div>

      <Router>
        <Routes>
          {/*Public Routes*/ }
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signUp" element={<SignUp/>}></Route>
          <Route path="/login" element={<Login/>}></Route>

          <Route path="/find-jobs" element={<JobSeekerDashboards/>}></Route>
          <Route path="/job/:jobId" element={<JobDetails/>}></Route>
          <Route path="/saved-jobs" element={<SavedJobs/>}></Route>
          <Route path="/profile" element={<UserProfile/>}></Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes requiredRole="employer"/>}>
            <Route path="/employer-dashboard" element={<EmployerDasboard/>}></Route>
            <Route path="/post-job" element={<JobPostingForm/>}></Route>
            <Route path="/manage-jobs" element={<ManageJob/>}></Route>
            <Route path="/applicants" element={<ApplicationViewer/>}></Route>
            <Route path="/company-profile" element={<EmployerProfilePage/>}></Route>
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace/>}></Route>
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          }
        }}
      />
    </div>
  )
}

export default App
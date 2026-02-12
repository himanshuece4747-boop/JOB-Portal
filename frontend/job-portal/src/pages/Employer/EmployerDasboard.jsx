import { useEffect, useState } from "react";
import {
  Briefcase,
  Users,
  Building2,
  TrendingUp,
  CheckCircle2,
  Plus,
} from "lucide-react";
import moment from "moment"; 
import { useNavigate } from "react-router-dom"; 
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths"; 
import DashboardLayout from "../../Layout/DashboardLayout"; 
import LoadingSpinner from "../../components/LoadingSpinner"; 
import ApplicationDashboardCard from "../../components/ApplicationDashboardCard"; //  import your card

const Card = ({ title, headerAction, subtitle, className, children }) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md ${className}`}>
      {(title || headerAction || subtitle) && (
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          {headerAction}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = "blue",
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-emerald-500 to-emerald-600",
    purple: "from-violet-500 to-violet-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
  };

  return (
    <Card className={`bg-gradient-to-br ${colorClasses[color]} text-white border-0`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        <div className="bg-white/10 p-3 rounded-xl">
          {Icon && <Icon className="h-6 w-6" />}
        </div>
      </div>
    </Card>
  );
};

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getDashboardOverview = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.OVERVIEW);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard overview:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDashboardOverview();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout activeMenu="employer-dashboard">
      <div className="max-w-7xl mx-auto space-y-8 mb-96">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Active Jobs"
            value={dashboardData?.counts?.totalActiveJobs || 0}
            icon={Briefcase}
            trend={true}
            trendValue={`${dashboardData?.counts?.trends?.activeJobs || 0}%`}
            color="blue"
          />

          <StatCard
            title="Total Applicants"
            value={dashboardData?.counts?.totalApplications || 0}
            icon={Users}
            trend={true}
            trendValue={`${dashboardData?.counts?.trends?.totalApplicants || 0}%`}
            color="green"
          />

          <StatCard
            title="Hired"
            value={dashboardData?.counts?.totalHired || 0}
            icon={CheckCircle2}
            trend={true}
            trendValue={`${dashboardData?.counts?.trends?.totalHired || 0}%`}
            color="purple"
          />

          <StatCard
            title="Companies"
            value={dashboardData?.counts?.totalCompanies || 0}
            icon={Building2}
            trend={true}
            trendValue={`${dashboardData?.counts?.trends?.companies || 0}%`}
            color="orange"
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Job Posts */}
          <Card
            title="Recent Job Posts"
            subtitle="Your latest job postings"
            headerAction={
              <button
                className="text-sm font-medium text-blue-600 hover:underline"
                onClick={() => navigate("/manage-jobs")}
              >
                View all
              </button>
            }
          >
            <div className="space-y-4">
              {dashboardData?.data?.recentJobs?.slice(0, 3)?.map((job, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-100 pb-2"
                >
                  <div>
                    <p className="text-gray-900 font-medium">{job.title}</p>
                    <p className="text-sm text-gray-500">
                      {moment(job.createdAt).format("MMM DD, YYYY")}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {job.status || "Open"}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Applications */}
          <Card
            title="Recent Applications"
            subtitle="Latest candidate applications"
            headerAction={
              <button
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                onClick={() => navigate("/manage-jobs")}
              >
                View all
              </button>
            }
          >
            <div className="space-y-3">
              {dashboardData?.data?.recentApplications?.slice(0, 3)?.map((data, index) => (
                <ApplicationDashboardCard
                  key={index}
                  applicant={data?.applicant || ""}
                  position={data?.job?.title || ""}
                  time={moment(data?.updatedAt).fromNow()}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card
          title="Quick Actions"
          subtitle="Common tasks to get you started"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Post New Job",
                icon: Plus,
                color: "bg-blue-50 text-blue-700",
                path: "/post-job",
              },
              {
                title: "Review Applications",
                icon: Users,
                color: "bg-green-50 text-green-700",
                path: "/manage-jobs",
              },
              {
                title: "Company Settings",
                icon: Building2,
                color: "bg-orange-50 text-orange-700",
                path: "/company",
              },
            ].map((action, idx) => (
              <button
                key={idx}
                onClick={() => navigate(action.path)}
                className={`flex items-center justify-center gap-2 rounded-lg p-4 font-medium shadow-sm hover:shadow-md transition ${action.color}`}
              >
                <action.icon className="h-5 w-5" />
                {action.title}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EmployerDashboard;

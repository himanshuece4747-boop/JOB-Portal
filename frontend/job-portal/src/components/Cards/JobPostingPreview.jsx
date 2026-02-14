import {
  MapPin,
  DollarSign,
  ArrowLeft,
  Building2,
  Clock,
  IndianRupee,
} from "lucide-react";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import { useAuth } from "../../context/AuthContext";

const JobPostingPreview = ({ formData, setIsPreview }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8">

          {/* Top Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Job Preview
            </h2>

            <button
              onClick={() => setIsPreview(false)}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Edit
            </button>
          </div>

          {/* Hero Section */}
          <div className="border-b border-gray-200 pb-8">

            <div className="flex items-start justify-between">

              {/* Left Content */}
              <div className="flex-1">

                {/* Job Title */}
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {formData.jobTitle}
                </h1>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {formData.location}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mt-6">

                  {/* Category */}
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {
                      CATEGORIES.find(
                        (c) => c.value === formData.category
                      )?.label
                    }
                  </span>

                  {/* Job Type */}
                  <span className="px-4 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                    {
                      JOB_TYPES.find(
                        (j) => j.value === formData.type
                      )?.label
                    }
                  </span>

                  {/* Posted */}
                  <div className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                    <Clock className="h-4 w-4" />
                    <span>Posted today</span>
                  </div>

                </div>
              </div>

              {/* Company Logo */}
              <div className="ml-6">
                {user?.companyLogo ? (
                  <img
                    src={user.companyLogo}
                    alt="Company Logo"
                    className="h-20 w-20 object-cover rounded-2xl shadow-md"
                  />
                ) : (
                  <div className="h-20 w-20 bg-white shadow-md rounded-2xl flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Compensation Section */}
          <div className="mt-8 bg-green-50 border border-green-100 rounded-2xl p-6 flex items-center justify-between">

            <div className="flex items-center gap-4">
              <div className="bg-green-600 text-white p-4 rounded-xl shadow-md">
                <IndianRupee className="h-6 w-6" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Compensation
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  ₹ {formData.salaryMin} - ₹ {formData.salaryMax} per year
                </p>
              </div>
            </div>

            <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-full">
              Competitive
            </span>
          </div>

          {/* About This Role */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-purple-500 pl-3">
              About This Role
            </h3>

            <div className="mt-4 bg-gray-50 rounded-xl p-6 text-gray-700 leading-relaxed">
              {formData.description}
            </div>
          </div>

          {/* Requirements */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-purple-500 pl-3">
              What We're Looking For
            </h3>

            <div className="mt-4 bg-purple-50 rounded-xl p-6 text-gray-700 leading-relaxed">
              {formData.requirements}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobPostingPreview;

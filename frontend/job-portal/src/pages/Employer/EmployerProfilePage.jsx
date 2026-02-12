import { useState } from "react";
import { Edit3, Mail, Building2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import uploadImage from "../../utils/uploadImage";

import DashboardLayout from "../../components/layout/DashboardLayout";
import EditProfileDetails from "../../components/profile/EditProfileDetails";

const EmployerProfilePage = () => {
  const { user, updateUser } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    companyName: user?.companyName || "",
    companyDescription: user?.companyDescription || "",
    companyLogo: user?.companyLogo || "",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [uploading, setUploading] = useState({ avatar: false, logo: false });
  const [saving, setSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Refined image upload
  const handleImageUpload = async (file, type) => {
    setUploading((prev) => ({ ...prev, [type]: true }));
    try {
      const imgUploadRes = await uploadImage(file);
      const imageUrl = imgUploadRes.imageUrl || "";
      const field = type === "avatar" ? "avatar" : "companyLogo";
      handleInputChange(field, imageUrl);
      toast.success(`${field} updated successfully`);
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error(`Failed to upload ${type}`);
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file, type);
    }
  };

  // Improved save logic
  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );

      if (response.status === 200) {
        toast.success("Profile Details Updated Successfully!!");
        setProfileData({ ...formData });
        updateUser({ ...formData });
        setEditMode(false);
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profileData });
    setEditMode(false);
  };

  // Conditional rendering
  if (editMode) {
    return (
      <EditProfileDetails
        formData={formData}
        handleImageChange={handleImageChange}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        saving={saving}
        uploading={uploading}
      />
    );
  }

  return (
    <DashboardLayout activeMenu="company-profile">
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 flex items-center justify-between">
              <h1 className="text-xl font-medium text-white">Employer Profile</h1>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-opacity-30 text-white px-4 py-2 rounded"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {/* Profile Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Personal Information
                  </h2>
                  <div className="flex items-center space-x-4">
                    <img
                      src={profileData.avatar}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover border-4 border-blue-50"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {profileData.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{profileData.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Company Information
                  </h2>
                  <div className="flex items-center space-x-4">
                    <img
                      src={profileData.companyLogo}
                      alt="Company Logo"
                      className="w-20 h-20 rounded-lg object-cover border-4 border-blue-500"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {profileData.companyName}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Building2 className="w-4 h-4 mr-2" />
                        <span>Company</span>
                      </div>
                    </div>
                  </div>

                  {/* Company Description */}
                  <div className="mt-8">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                      About Company
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded">
                      {profileData.companyDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployerProfilePage;

import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useState, useEffect } from 'react'
import {
  AlertCircle,
  MapPin,
  Briefcase,
  Users,
  Eye,
  Send,
  IndianRupee,
} from "lucide-react"
import { API_PATHS } from '../../utils/apiPaths';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { CATEGORIES, JOB_TYPES } from '../../utils/data';
import { toast } from 'react-hot-toast';
import { SelectField } from '../../components/Input/SelectField';
import InputField from "../../components/Input/InputField";
import TextareaField from "../../components/Input/TextareaField";
import JobPostingPreview from "../../components/Cards/JobPostingPreview"; // ✅ needed for Preview button

const JobPostingForm = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId || null;

  const [formData, setFormData] = useState({
    jobTitle: '',
    location: '',
    category: '',
    type: '',
    description: '',
    requirements: '',
    salaryMin: '',
    salaryMax: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateErrors = validateForm(formData);
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    setIsSubmitting(true);

    const jobPayload = {
      title: formData.jobTitle,
      description: formData.description,
      requirements: formData.requirements,
      location: formData.location,
      category: formData.category,
      type: formData.type,
      salaryMin: formData.salaryMin,
      salaryMax: formData.salaryMax,
    };

    try {
      const response = jobId
        ? await axiosInstance.put(API_PATHS.JOBS.UPDATE_JOB(jobId), jobPayload) // ✅ fixed
        : await axiosInstance.post(API_PATHS.JOBS.POST_JOB, jobPayload);

      if (response.status === 200 || response.status === 201) {
        toast.success(
          jobId ? "Job updated successfully!" : "Job posted successfully!"
        );

        setFormData({
          jobTitle: '',
          location: '',
          category: '',
          type: '',
          description: '',
          requirements: '',
          salaryMin: '',
          salaryMax: '',
        });

        navigate('/employer-dashboard'); // ✅ fixed typo
        return;
      }

      toast.error("Something went wrong. Please try again.");
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to post/update job. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ fixed salary validation logic
  const validateForm = (formData) => {
    const errors = {};

    if (!formData.jobTitle.trim())
      errors.jobTitle = "Job title is required";

    if (!formData.category)
      errors.category = "Please select a category";

    if (!formData.type)
      errors.type = "Please select a job type";

    if (!formData.description.trim())
      errors.description = "Job description is required";

    if (!formData.requirements.trim())
      errors.requirements = "Job requirements are required";

    if (!formData.salaryMin || !formData.salaryMax) {
      errors.salary = "Both minimum and maximum salary are required.";
    } else if (parseInt(formData.salaryMin) >= parseInt(formData.salaryMax)) {
      errors.salary = "Minimum salary must be less than maximum salary.";
    }

    if (!formData.location.trim())
      errors.location = "Location is required";

    return errors;
  };

  const isFormValid = () => {
    return Object.keys(validateForm(formData)).length === 0;
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (jobId) {
        try {
          const response = await axiosInstance.get(
            API_PATHS.JOBS.GET_JOB_BY_ID(jobId)
          );
          const jobData = response.data;

          if (jobData) {
            setFormData({
              jobTitle: jobData.title,
              location: jobData.location,
              category: jobData.category,
              type: jobData.type,
              description: jobData.description,
              requirements: jobData.requirements,
              salaryMin: jobData.salaryMin,
              salaryMax: jobData.salaryMax,
            });
          }
        } catch (error) {
          console.error("Error fetching job details");
        }
      }
    };

    fetchJobDetails();
  }, []);

  if (isPreview) {
    return (
      <DashboardLayout activeMenu='post-job'>
        <JobPostingPreview formData={formData} setIsPreview={setIsPreview} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu='post-job'>
      <div className='min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-white shadow-xl rounded-2xl p-6'>

            <div className='flex items-center justify-between mb-8'>
              <div>
                <h2 className='text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent'>
                  Post a New Job
                </h2>
                <p className='text-sm text-gray-600 mt-1'>
                  Fill out the form below to create your Job Posting.
                </p>
              </div>

              {/* ✅ Preview button now works */}
              <button
                type="button"
                onClick={() => setIsPreview(true)}
                disabled={!isFormValid()}
                className='flex items-center space-x-2 px-6 py-3 text-sm font-medium border rounded-xl'
              >
                <Eye className='h-4 w-4' />
                <span>Preview</span>
              </button>
            </div>

            <div className='space-y-6'>

              <InputField
                label='Job Title'
                id='jobTitle'
                placeholder='e.g. Senior Frontend Engineer'
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                error={errors.jobTitle}
                required
                icon={Briefcase}   
              />

              <InputField
                label='Location'
                id='location'
                placeholder='e.g. New York'
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                error={errors.location}
                required
                icon={MapPin}     
              />

              <SelectField
                label='Category'
                id='category'
                placeholder='Select a category'
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                options={CATEGORIES}
                error={errors.category}
                required
                icon={Users}
              />

              <SelectField
                label='Job Type'
                id='type'
                placeholder='Select job type'
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                options={JOB_TYPES}
                error={errors.type}
                required
                icon={Briefcase}
              />

              <TextareaField
                label='Job Description'
                id='description'
                placeholder='Describe the role and responsibilities...'
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                error={errors.description}
                required
              />

              <TextareaField
                label='Requirements'
                id='requirements'
                placeholder='List the required skills and qualifications...'
                value={formData.requirements}
                onChange={(e) => handleInputChange("requirements", e.target.value)}
                error={errors.requirements}
                required
              />

              {/* Salary */}
              <div className='grid grid-cols-2 gap-4'>
                <input
                  type='number'
                  placeholder='Min Salary'
                  value={formData.salaryMin}
                  onChange={(e) => handleInputChange("salaryMin", e.target.value)}
                  className='border p-3 rounded-lg'
                />
                <input
                  type='number'
                  placeholder='Max Salary'
                  value={formData.salaryMax}
                  onChange={(e) => handleInputChange("salaryMax", e.target.value)}
                  className='border p-3 rounded-lg'
                />
              </div>

              {errors.salary && (
                <p className='text-red-600 text-sm flex items-center gap-1'>
                  <AlertCircle className='h-4 w-4' />
                  {errors.salary}
                </p>
              )}

              {/* ✅ Publish button now works */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !isFormValid()}
                className='w-full bg-blue-600 text-white py-3 rounded-lg'
              >
                {isSubmitting ? "Publishing..." : "Publish Job"}
              </button>

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobPostingForm;

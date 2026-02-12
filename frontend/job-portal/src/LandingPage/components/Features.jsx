import React from "react";
import { employerFeatures, jobSeekerFeatures } from "../../../utils/data";

const Features = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2">
              Succeed
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're looking for your next opportunity or the perfect
            candidate, we have the tools and features to make it happen.
          </p>
        </div>

        {/* Grid Layout for Job Seekers & Employers */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {/* Job Seekers Section */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold text-gray-800">
                For Job Seekers
              </h3>
            </div>
            <div className="space-y-8">
              {jobSeekerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gray-50"
                >
                  <div className="text-blue-600 text-3xl">
                    <feature.icon />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employers Section */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold text-gray-800">
                For Employers
              </h3>
            </div>
            <div className="space-y-8">
              {employerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gray-50"
                >
                  <div className="text-purple-600 text-3xl">
                    <feature.icon />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

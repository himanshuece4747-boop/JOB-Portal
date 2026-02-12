import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { CATEGORIES, JOB_TYPES } from "../../../utils/data";
import SalaryRangeSlider from "../../../components/Input/SalaryRangeSlider";

const FilterSection = ({ title, children, isExpanded, onToggle }) => (
  <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left font-semibold text-gray-800 hover:text-blue-600"
    >
      {title}
      {isExpanded ? (
        <ChevronUp className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      )}
    </button>
    {isExpanded && <div className="mt-3">{children}</div>}
  </div>
);

const FilterContent = ({
  toggleSection,
  clearAllFilters,
  expandedSections,
  filters,
  handleFilterChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Clear All Button */}
      <div>
        <button
          onClick={clearAllFilters}
          className="text-sm text-red-500 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Job Type Section */}
      <FilterSection
        title="Job Type"
        isExpanded={expandedSections?.jobType}
        onToggle={() => toggleSection("jobType")}
      >
        <div className="space-y-3">
          {JOB_TYPES.map((type) => (
            <label
              key={type.value}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                checked={filters?.type === type.value}
                onChange={(e) =>
                  handleFilterChange("type", e.target.checked ? type.value : "")
                }
              />
              <span className="ml-3 text-gray-700 font-medium">
                {type.value}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Category Section */}
      <FilterSection
        title="Category"
        isExpanded={expandedSections?.categories}
        onToggle={() => toggleSection("categories")}
      >
        <div className="space-y-3">
          {CATEGORIES.map((type) => (
            <label
              key={type.value}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                checked={filters?.category === type.value}
                onChange={(e) =>
                  handleFilterChange("category", e.target.checked ? type.value : "")
                }
              />
              <span className="ml-3 text-gray-700 font-medium">
                {type.value}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Salary Range Section */}
      <FilterSection
        title="Salary Range"
        isExpanded={expandedSections?.salary}
        onToggle={() => toggleSection("salary")}
      >
        <SalaryRangeSlider
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      </FilterSection>
    </div>
  );
};

export default FilterContent;

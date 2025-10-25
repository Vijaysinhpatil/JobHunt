import React from "react";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["Pune", "Noida", "Bengaluru", "Nipnai"],
  },
  {
    filterType: "Industry",
    array: ["Front-End Developer", "Backend Developer", "Fullstack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh-2lakh"],
  },
];

function FilterCard() {
  return (
    <div className="w-80 bg-gray-900 shadow-lg rounded-2xl p-6 border border-gray-700">
      <h1 className="text-xl font-semibold text-white">Filter Jobs</h1>
      <hr className="my-4 border-gray-700" />

      {/* Filter Groups */}
      <div className="space-y-6">
        {filterData.map((items, index) => (
          <div key={index}>
            {/* Filter Title */}
            <h2 className="text-sm font-medium text-gray-400 uppercase mb-3 tracking-wide">
              {items.filterType}
            </h2>

            {/* Radio Options */}
            <RadioGroup>
              {items.array.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 mb-2 cursor-pointer hover:bg-gray-800 p-2 rounded-md transition"
                >
                  <RadioGroupItem
                    value={item}
                    id={`${items.filterType}-${idx}`}
                    className="text-blue-500 border-gray-500"
                  />
                  <Label
                    htmlFor={`${items.filterType}-${idx}`}
                    className="text-gray-200 text-sm"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>

      {/* Apply Button */}
      <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition">
        Apply Filters
      </button>
    </div>
  );
}

export default FilterCard;

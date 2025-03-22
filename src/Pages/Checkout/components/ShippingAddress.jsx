import React from "react";

const ShippingAddress = ({ ErrorMessage, Field }) => {
  return (
    <div className="space-y-4 border border-gray-300 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-900">Shipping Address</h2>
      <div className="grid grid-cols-1 gap-4">
        {/* Address */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-1 text-sm font-medium">
            <label className="block  text-gray-900">
              Address <span className="text-red-600">*</span>
            </label>
            <ErrorMessage
              name="address"
              component="p"
              className="text-red-500 bg-red-200 px-2 rounded text-sm"
            />
          </div>
          <Field
            type="text"
            name="address"
            className="w-full border border-gray-300 trans p-2 rounded-lg focus:border-gray-600"
          />
        </div>
        {/* City */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-1 text-sm font-medium">
            <label className="block  text-gray-900">
              City <span className="text-red-600">*</span>
            </label>
            <ErrorMessage
              name="city"
              component="p"
              className="text-red-500 bg-red-200 px-2 rounded text-sm"
            />
          </div>
          <Field
            type="text"
            name="city"
            className="w-full border border-gray-300 trans p-2 rounded-lg focus:border-gray-600"
          />
        </div>
        {/* Phone Number */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-1 text-sm font-medium">
            <label className="block  text-gray-900">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <ErrorMessage
              name="phone"
              component="p"
              className="text-red-500 bg-red-200 px-2 rounded text-sm"
            />
          </div>
          <Field
            type="text"
            name="phone"
            className="w-full border border-gray-300 trans p-2 rounded-lg focus:border-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;

  import React, { useState } from "react";

  // Sample Data
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Home & Kitchen" },
    { id: 4, name: "Books" },
    { id: 5, name: "Sports & Outdoors" }
  ];

  const employees = [
    { id: 1, name: "John Doe", designation: "Software Engineer", department: "IT", salary: 75000, hireDate: "2022-06-01" },
    { id: 2, name: "Jane Smith", designation: "Product Manager", department: "Marketing", salary: 85000, hireDate: "2021-09-15" },
    { id: 3, name: "Michael Brown", designation: "UX Designer", department: "Design", salary: 68000, hireDate: "2023-02-10" },
    { id: 4, name: "Emily Davis", designation: "Data Scientist", department: "Data Analytics", salary: 95000, hireDate: "2020-11-05" },
    { id: 5, name: "William Johnson", designation: "HR Specialist", department: "Human Resources", salary: 60000, hireDate: "2019-04-20" }
  ];

  const formFields = [
    { id: "firstName", label: "First Name", type: "text", placeholder: "Enter your first name", required: true },
    { id: "lastName", label: "Last Name", type: "text", placeholder: "Enter your last name", required: true },
    { id: "email", label: "Email", type: "email", placeholder: "Enter your email address", required: true },
    { id: "password", label: "Password", type: "password", placeholder: "Enter your password", required: true },
    { id: "gender", label: "Gender", type: "select", options: [{ value: "male", label: "Male" }, { value: "female", label: "Female" }, { value: "other", label: "Other" }], required: true },
    { id: "dob", label: "Date of Birth", type: "date", placeholder: "Select your birth date", required: true },
    { id: "bio", label: "Bio", type: "textarea", placeholder: "Tell us about yourself", required: false }
  ];

  const radioFields = [
    { id: "gender", label: "Gender", type: "radio", options: [{ value: "male", label: "Male" }, { value: "female", label: "Female" }, { value: "other", label: "Other" }], required: true },
    { id: "subscription", label: "Subscription Plan", type: "radio", options: [{ value: "basic", label: "Basic Plan" }, { value: "premium", label: "Premium Plan" }, { value: "pro", label: "Pro Plan" }], required: true }
  ];
  const App = () => {
    const [mainContainer, setMainContainer] = useState([]);
    const [fieldSizes, setFieldSizes] = useState({});
  
    // Handle the start of drag event
    const handleDragStart = (event, field) => {
      event.dataTransfer.setData("field", JSON.stringify(field));
    };
  
    // Handle drop event and add the dropped field to the main container
    const handleDrop = (event, index) => {
      event.preventDefault();
      const field = JSON.parse(event.dataTransfer.getData("field"));
      let updatedContainer = [...mainContainer];
  
      // If index is defined, insert the field at the specified index (between other fields)
      if (index !== undefined) {
        updatedContainer.splice(index, 0, field);
      } else {
        updatedContainer.push(field);  // Add at the end
      }
      setMainContainer(updatedContainer);
    };
  
    // Allow drop
    const handleDragOver = (event) => {
      event.preventDefault();
    };
  
    // Remove field from the main container
    const handleRemoveField = (index) => {
      setMainContainer((prev) => prev.filter((_, i) => i !== index));
    };
  
    // Render fields based on their type
    const renderField = (field, index) => {
      switch (field.type) {
        case "text":
        case "email":
        case "password":
          return (
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          );
        case "select":
          return (
            <select className="p-3 border rounded-lg w-full">
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        case "textarea":
          return (
            <textarea
              placeholder={field.placeholder}
              className="p-3 border rounded-lg w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          );
        case "radio":
          return (
            <div className="space-y-2">
              {field.options.map((option) => (
                <label key={option.value} className="block">
                  <input type="radio" name={field.id} value={option.value} className="mr-2" />
                  {option.label}
                </label>
              ))}
            </div>
          );
        case "table":
          return (
            <table className="table-auto border-collapse border border-gray-300 w-full">
              <thead>
                <tr>
                  <th className="border p-3 text-left">Name</th>
                  <th className="border p-3 text-left">Designation</th>
                  <th className="border p-3 text-left">Department</th>
                  <th className="border p-3 text-left">Salary</th>
                  <th className="border p-3 text-left">Hire Date</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="border p-3">{employee.name}</td>
                    <td className="border p-3">{employee.designation}</td>
                    <td className="border p-3">{employee.department}</td>
                    <td className="border p-3">{employee.salary}</td>
                    <td className="border p-3">{employee.hireDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        default:
          return null;
      }
    };
  
    // Handle field size change
    const handleSizeChange = (fieldId, size) => {
      setFieldSizes((prev) => ({ ...prev, [fieldId]: size }));
    };
  
    return (
      <div className="flex min-h-screen p-6 space-x-6">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Fields</h2>
          {/* Render Form Fields */}
          {formFields.map((field) => (
            <div
              key={field.id}
              draggable
              onDragStart={(event) => handleDragStart(event, field)}
              className="bg-blue-100 text-blue-800 p-3 mb-4 rounded-lg shadow cursor-pointer hover:bg-blue-200"
            >
              <div className="flex justify-between items-center">
                <span>{field.label}{field.required && <span className="text-red-500">*</span>}</span>
              </div>
            </div>
          ))}
  
          {/* Render Radio Fields */}
          {radioFields.map((field) => (
            <div
              key={field.id}
              draggable
              onDragStart={(event) => handleDragStart(event, field)}
              className="bg-blue-100 text-blue-800 p-3 mb-4 rounded-lg shadow cursor-pointer hover:bg-blue-200"
            >
              <div className="flex justify-between items-center">
                <span>{field.label}{field.required && <span className="text-red-500">*</span>}</span>
              </div>
            </div>
          ))}
  
          {/* Render Select Categories (Dropdown) */}
          <div
            draggable
            onDragStart={(event) => handleDragStart(event, { type: "select", options: categories, label: "Select Category", required: true })}
            className="bg-blue-100 text-blue-800 p-3 mb-4 rounded-lg shadow cursor-pointer hover:bg-blue-200"
          >
            Select Category Dropdown
          </div>
  
          {/* Render Table */}
          <div
            draggable
            onDragStart={(event) => handleDragStart(event, { type: "table" })}
            className="bg-blue-100 text-blue-800 p-3 mb-4 rounded-lg shadow cursor-pointer hover:bg-blue-200"
          >
            Employee Table
          </div>
        </div>
  
        {/* Main Container */}
        <div
          className="w-2/4 bg-white p-6 rounded-lg shadow-lg space-y-4"
          onDrop={(event) => handleDrop(event)}
          onDragOver={handleDragOver}
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Main Container</h2>
          {mainContainer.map((field, index) => (
            <div
              key={index}
              className="p-4 mb-4 rounded-lg shadow relative"
              onDrop={(event) => handleDrop(event, index)}
              onDragOver={handleDragOver}
              style={{ width: fieldSizes[field.id] || "100%" }}  
            >
              <button
                onClick={() => handleRemoveField(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="flex justify-between items-center mb-2">
                <span>{field.label}{field.required && <span className="text-red-500">*</span>}</span>
              </div>
              {renderField(field, index)}
            </div>
          ))}
        </div>
  
        {/* Right Sidebar */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Right Sidebar</h2>
          <p className="text-gray-600">You can adjust field sizes here:</p>
          {mainContainer.map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                {field.label} Width
              </label>
              <input
                type="range"
                min="20"
                max="100"
                value={fieldSizes[field.id] ? parseInt(fieldSizes[field.id]) : 100}
                onChange={(e) =>
                  handleSizeChange(field.id, `${e.target.value}%`)
                }
                className="w-full"
              />
              <span className="text-sm text-gray-500">{fieldSizes[field.id] || "100%"}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default App;
  
        
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Edit2, X } from 'lucide-react';

function EmployeeDetail() {
  const { id } = useParams();  // Employee ID from URL (to be used in future API calls)
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Placeholder data for now, to be replaced with API data later
  const [employee, setEmployee] = useState({
    id: Number(id),
    fullName: 'John Doe',
    age: 30,
    department: 'Engineering',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, City, Country',
    position: 'Senior Developer',
    joinDate: '2022-01-15',
    salary: '75000'
  });

  const [editedEmployee, setEditedEmployee] = useState(employee);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // API call to save the updated employee data can be added here
    setEmployee(editedEmployee);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedEmployee(employee);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/employees')}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Employee Details</h1>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                <Save className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(editedEmployee).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type={key === 'age' || key === 'salary' ? 'number' : 'text'}
                name={key}
                value={value}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-2 border rounded-md ${
                  isEditing
                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-gray-50 border-gray-200'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;

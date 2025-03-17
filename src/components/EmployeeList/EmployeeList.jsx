import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useEmployees } from '../context/EmployeeContext';
import {useEmployees } from '../../context/EmployeeContext'
import { Trash2, Edit } from 'lucide-react';

export const EmployeeList = () => {
  const { employees, deleteEmployee } = useEmployees();
  const navigate = useNavigate();

  const handleDoubleClick = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Employee Directory</h1>
        <button
          onClick={() => navigate('/add')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Employee
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            onDoubleClick={() => handleDoubleClick(employee.id)}
          >
            <div className="relative">
              <img
                src={employee.picture || 'https://via.placeholder.com/150'}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-0 right-0 p-2 flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit/${employee.id}`);
                  }}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEmployee(employee.id);
                  }}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {employee.firstName} {employee.lastName}
                  </h3>
                  <p className="text-gray-600">{employee.department}</p>
                </div>
                <span className="text-sm text-gray-500">ID: {employee.id.slice(0, 8)}</span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>{employee.email}</p>
                <p>{employee.address}</p>
                <p>DOB: {new Date(employee.dateOfBirth).toLocaleDateString()}</p>
                <p>Started: {new Date(employee.startDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
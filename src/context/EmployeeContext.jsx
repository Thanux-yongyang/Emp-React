import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Employee Context
const EmployeeContext = createContext();

// Provider Component
export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to handle errors
  const handleError = (error, message) => {
    console.error(message, error);
    setError(message);
    alert(message);
  };

  // Fetch employees from backend
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://backend:8080/api/employees");
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      handleError(error, "Failed to load employees.");
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Get single employee
  const getEmployee = (id) => {
    return employees.find(emp => emp.id === id);
  };

  // Add employee
  const addEmployee = async (newEmployee) => {
    try {
      const response = await axios.post("http://backend:8080/api/employees", newEmployee);
      setEmployees(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      handleError(error, "Failed to add employee.");
      throw error;
    }
  };

  // Update employee
  const updateEmployee = async (id, updatedEmployee) => {
    try {
      const response = await axios.put(`http://backend:8080/api/employees/${id}`, updatedEmployee);
      setEmployees(prev =>
        prev.map(emp => emp.id === id ? response.data : emp)
      );
      return response.data;
    } catch (error) {
      handleError(error, "Failed to update employee.");
      throw error;
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://backend:8080/api/employees/${id}`);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    } catch (error) {
      handleError(error, "Failed to delete employee.");
      throw error;
    }
  };

  // Context value
  const value = {
    employees,
    loading,
    error,
    getEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    fetchEmployees // In case you need to refresh the list
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

// Custom hook to use employee context
export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployees must be used within an EmployeeProvider");
  }
  return context;
};
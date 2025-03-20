import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Employee Context
const EmployeeContext = createContext();

// Provider Component
export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employees from backend when app starts
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/employees") // Your backend API endpoint
      .then((response) => {
        setEmployees(response.data); // Store employees in context
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setError("Failed to load employees.");
        setLoading(false);
      });
  }, []); // Runs only once when the app loads

  // Function to delete an employee and update context
  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${employeeId}`);
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== employeeId));
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee.");
    }
  };

  // Function to add an employee and update context
  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  return (
    <EmployeeContext.Provider value={{ employees, loading, error, deleteEmployee, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

// Custom Hook to Use Employees Context
export const useEmployees = () => useContext(EmployeeContext);

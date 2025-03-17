import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const EmployeeContext = createContext(undefined);

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employeeData) => {
    const newEmployee = {
      ...employeeData,
      id: uuidv4(),
    };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (id, employeeData) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...employeeData, id } : emp
    ));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const getEmployee = (id) => {
    return employees.find(emp => emp.id === id);
  };

  return (
    <EmployeeContext.Provider value={{
      employees,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      getEmployee,
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};
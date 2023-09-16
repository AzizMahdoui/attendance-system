import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { Employee } from "../../exports/schemas";
import Card from "./employe-card/Card";
import './Employees.css'
const EmployeesPage = () => {
  const socket = socketIOClient("http://localhost:3000", { transports: ["websocket"] });

  const [employeesData, setEmployeesData] = useState<Employee[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    socket.on('employee_list', (employees) => {
      setEmployeesData(employees);
      setError(null);
    });
    socket.on('error', (errorMessage) => {
      console.error('Server Error:', errorMessage);
      setError(errorMessage);
    });

    return () => {
      socket.off('employee_list');
      socket.off('error');
    };
  }, []); 

  return (
    <div className="employees-page">
      <div className="page-title" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <h1>Employees List</h1>
      </div>

      {/* Display the error message if an error occurs */}
      {/* {error && <div className="error-message">{error}</div>} */}

      <div className="cards-container">
        {employeesData.map((element)=>(
            <Card firstName={element.firstName} 
                  lastName={element.lastName}
                  avatar={element.avatar}
                  position={element.position}
                  id={element._id}/>
                  
             ))}
  </div>
  
      
    </div>
  );
};

export default EmployeesPage;

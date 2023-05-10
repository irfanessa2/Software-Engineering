import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/page.module.css';
import Table from '../components/Table';

function Employee_Details() {
  const [employee, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/Employee_Details').then((response) => {
        console.log(response.data);
      setUsers(response.data);
    });
  }, []);

  const headers = ['Employee ID', 'First Name', 'Last Name', 'Email', 'Salary', 'Type'];

  const rows = React.useMemo(() => {
    return employee.map(employees => [employees.employee_id, employees.first_name, employees.last_name, employees.email, employees.salary, emplayees.type])
  }, [employee])

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>
        <div style={{padding: "8px 24px"}}>Emplayee Details</div>
      </div>
      <Table
        headers={headers} rows={rows}
      />
    </div>
  )
}

Employee_Details.displayName = 'Employee_Details';

export default React.memo(Employee_Details);

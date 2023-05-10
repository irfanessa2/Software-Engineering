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
    return employee.map(emplayees => [emplayees.employee_id, emplayees.first_name, emplayees.last_name, emplayees.email, emplayees.salary, emplayees.type])
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

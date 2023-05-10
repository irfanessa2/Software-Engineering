import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/page.module.css';
import Table from '../components/Table';

function Fisherman() {
  const [fisherman_details, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/Fisherman').then((response) => {
        console.log(response.data);
      setUsers(response.data);
    });
  }, []);

  const headers = ['Fisherman ID', 'Fisherman First Name', 'Fisherman Last Name', 'Fisherman Address', 'Crab Death Rate', 'Quality'];

  const rows = React.useMemo(() => {
    return fisherman_details.map(fisherman => [fisherman.fisherman_id, fisherman.fisherman_first_name, fisherman.fisherman_last_name, fisherman.fisherman_address, fisherman.death_rate, fisherman.quality])
  }, [fisherman_details]);

  return(
    <div className={styles.mainContainer}>
      <div className={styles.title}>
        <div style={{padding: "8px 24px"}}>Fisherman Details</div>
      </div>
      <Table
        headers={headers} rows={rows}
      />
    </div>
    )
}

Fisherman.displayName = 'Fisherman';

export default React.memo(Fisherman);

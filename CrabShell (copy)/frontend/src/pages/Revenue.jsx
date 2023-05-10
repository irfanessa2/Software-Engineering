import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import TableInput from '../components/TableInput';
import styles from '../styles/page.module.css';

function Revenue() {
  const [revenue, setUsers] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  
  // fetch revenue data from backend
  useEffect(() => {
    axios.get('http://localhost:8081/Revenue').then((response) => {
      setUsers(response.data);
      const years = Array.from(new Set(response.data.map(({year}) => year))).slice().sort((yeara, yearb) => yearb - yeara)
      setFilters(['all', ...years]);
      setSelectedFilter(years[0]);
    });
  }, []);


  const [values, setValues] = useState({
    year: '',
    month: '',
    revenue: ''
  })

  const inputs = React.useMemo(() => {
    return [
      {
        value: values.year,
        placeholder: 'Year',
        name: 'year',
      },
      {
        value: values.month,
        placeholder: 'Month',
        name: 'month',
      },
      {
        value: values.revenue,
        placeholder: 'Revenue',
        name: 'revenue',
      }
    ]
  }, [values.year, values.month, values.revenue])

  const handleInput=(event)=>{
      setValues(prev =>({...prev, [event.target.name]: [event.target.value]}))
  }

  const handleSubmit= () => {
    axios.post('http://localhost:8081/Revenue', values)
    .then(res => {
      console.log(res);
      alert('Sucessfully Updated!!!')
      setValues({
        year: '',
        month: '',
        revenue: ''
      })
    })
    .catch(err => console.log(err))
  }

  const revenueParser = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'});

  const totalRevenue = React.useMemo(() => {
    const filterFunc = ({year}) => String(year) === String(selectedFilter);
    let total = revenue;
    if(selectedFilter !== 'all') {
      total = total.filter(filterFunc);
    }
    total = total.reduce((acc, {revenue}) => acc + parseInt(revenue), 0)
    return `Total revenue: ${revenueParser.format(total)}`;
  }, [revenue, selectedFilter]);
  
  const rows = React.useMemo(() => {
    const filterFunc = ({year}) => String(year) === String(selectedFilter);
    let total = revenue;
    if (selectedFilter !== 'all') {
      total = total.filter(filterFunc);
    }
    return total.map(({month, revenue}) => [
      month, revenueParser.format(parseInt(revenue))
    ])
  }, [revenue, selectedFilter]);

  const handleFilterChange = React.useCallback((event) => {
    setSelectedFilter(event.target.value);
  }, [setSelectedFilter]);

  return(
    <div className={styles.mainContainer}>
      <div className={styles.revenueHeader}>
        <div style={{fontWeight: "600", flexGrow: "1"}} className={styles.headerCell}>
          {totalRevenue}
        </div>
        <div style={{flexGrow: "1"}} className={styles.headerCell}>
          Year{' '}<select value={selectedFilter} onInput={handleFilterChange} style={{backgroundColor: "#2b2bb6", color: "white"}}>
            {filters.map(((filter, index) => <option key={`${filter}-${index}`} value={filter}>{filter}</option>))}
          </select>
        </div>
      </div>
      <Table headers={[]} rows={rows}/>
      <TableInput
        textLabel='New month revenue'
        buttonLabel='Insert'
        inputs={inputs}
        onSubmit={handleSubmit}
        onChange={handleInput}
      />
    </div>
  )
}

Revenue.displayName = 'Revenue';

export default React.memo(Revenue);

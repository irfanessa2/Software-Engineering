import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/page.module.css';
import Table from '../components/Table';
import TableInput from '../components/TableInput';

function Records() {
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/Records').then((response) => {
      setInvoice(response.data);
    });
  }, []);

  const [values, setValues] = useState({
    invoice_id: '',
    buy_price: '',
    sell_price: '',
    fisherman_id: '',
    employee_id: '',
    category: ''
  })

  const inputs = React.useMemo(() => {
    return [
      {
        value: values.invoice_id,
        placeholder: 'Invoice Id',
        name: 'invoice_id',
      },
      {
        value: values.buy_price,
        placeholder: 'Buy Price',
        name: 'buy_price',
      },
      {
        value: values.sell_price,
        placeholder: 'Sell Price',
        name: 'sell_price',
      },
      {
        value: values.fisherman_id,
        placeholder: 'Fisherman ID',
        name: 'fisherman_id',
      },
      {
        value: values.employee_id,
        placeholder: 'Emplayee ID',
        name: 'employee_id',
      },
      {
        value: values.category,
        placeholder: 'Category',
        name: 'category',
      }
    ]
  }, [values.invoice_id, values.buy_price, values.sell_price, values.fisherman_id, values.employee_id, values.category]);

  const handleInput=(event)=>{
    setValues(prev =>({...prev, [event.target.name]: [event.target.value]}))
  }
  const handleSubmit=() =>{
    axios.post('http://localhost:8081/Records', values)
    .then(res => {
      alert('Sucessfully Updated!!!')
    })
    .catch(err => console.log(err))
  }

  const headers = ['Invoice Id', 'Buy Price', 'Sell Price', 'Fisherman ID', 'Emplayee ID', 'Category']

  const rows = React.useMemo(() => {
    return invoice.map(invoices => [invoices.invoice_id, invoices.buy_price, invoices.sell_price, invoices.fisherman_id, invoices.employee_id, invoices.category])
  }, [invoice])

    return(
      <div className={styles.mainContainer}>
        <div className={styles.title}>
          <div className={styles.titleInside}>Invoice Details</div>
        </div>
        <Table
          headers={headers} rows={rows}
        />
        <TableInput
          textLabel='New Invoice'
          buttonLabel='Update'
          inputs={inputs}
          onSubmit={handleSubmit}
          onChange={handleInput}
        />
      </div>
    )
}

Records.displayName = 'Records';

export default React.memo(Records);

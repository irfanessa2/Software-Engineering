import React from 'react';
import styles from '../styles/page.module.css';


const TableInput = ({textLabel, inputs, onChange, onSubmit, buttonLabel}) => {
  return (
    <div className={styles.tableInput}>
      <div className={styles.tableInputTextLabel}>{textLabel}</div>
      <div className={styles.tableInputContainer}>
        {inputs && inputs.map((input, index) => 
          <input className={styles.tableInputStyle}
            key={`${input.name}-${index}`}
            type="text"
            value={input.value}
            placeholder={input.placeholder}
            name={input.name}
            onChange={onChange}
          />
        )}
      </div>
      <div className={styles.tableInputButtonLabel} onClick={onSubmit}>{buttonLabel}</div>
    </div>
  )
};

TableInput.displayName = 'TableInput';

export default React.memo(TableInput);
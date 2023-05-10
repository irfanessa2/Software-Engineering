import React from 'react';
import styles from '../styles/page.module.css';

const Table = ({headers, rows}) => {

  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  if (!rows || !rows.length || !rows[0].length) return <></>;
  return windowSize > 600 ?
    (<div style={{ display: 'grid', gridTemplateColumns: `repeat(${rows[0].length}, auto)`, padding: '1px', backgroundColor: '#2b2bb6', gap: '1px'}}>
      {headers && headers.map((header, indexH) => <div key={indexH} className={styles.headerCell}>{header}</div>)}
      {rows.map((row, indexR) => row.map((value, indexV) => <div key={`${indexR}-${indexV}`} className={styles.bodyCell}>{value}</div>))}
    </div>) :
    <div style={{display: "block"}}>
      {rows.map((row, indexR, arr) => (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', padding: `2px 2px ${indexR === arr.length - 1 ? '2' : '0'}px 2px`, backgroundColor: '#2b2bb6', gap: '1px'}}>
            {/* {headers && headers.map((header, indexH) => <div key={indexH} className={styles.headerCell}>{header}</div>)} */}
            { row.map((value, indexV) =>
              <div key={`${indexR}-${indexV}`} className={styles.bodyCell}>{`${headers && headers.length && `${headers[indexV]}: ` || ''}${value}`}</div>)
            }
          </div>
        )
      )}
    </div>
};

Table.displayName = 'Table';

export default React.memo(Table);

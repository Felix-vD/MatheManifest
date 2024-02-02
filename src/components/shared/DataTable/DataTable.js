// DataTable.js

import React from 'react';
import styles from './DataTable.module.css'; // Make sure to create and import your CSS module

const DataTable = ({ data, onNext, onTrain, onBack, canGoBack }) => {
  return (
    <div>
      {canGoBack && (
        <div className={styles.backButtonContainer}>
          <button onClick={onBack} className={styles.backButton}>Back</button>
        </div>
      )}
        <table className={styles.table}>
        <thead>
            <tr>
            <th>Topic Name</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
            <tr key={index}>
                <td>{item.name}</td>
                <td>
                <button onClick={() => onNext(item)}>Next</button>
                <button onClick={() => onTrain(item)}>Train</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
};

export default DataTable;

import React from 'react';
import classes from './amount.module.css';

export default function Amount({ nom, denom }) {
  return (
    <span className={classes.amount}>
      {(nom / denom).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
}

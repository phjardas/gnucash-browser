import { Link } from 'gatsby';
import React from 'react';
import Amount from './amount';
import classes from './transactions.module.css';

export default ({ transactions, account }) => (
  <div className={classes.transactions}>
    {transactions
      .sort((a, b) => -a.postedAt.localeCompare(b.postedAt))
      .map((tx) => {
        const mySplit = tx.splits.find(
          (split) => split.account.id === account.id
        );

        return (
          <React.Fragment key={tx.id}>
            <div id={`tx-${tx.gnuCashId}`}>
              {new Date(tx.postedAt).toLocaleDateString()}
            </div>
            <div>{tx.description}</div>
            {tx.splits.length === 2 ? (
              <>
                <SingleSplit
                  split={tx.splits.find((split) => split !== mySplit)}
                  transaction={tx}
                />
                <Amount {...mySplit.value} />
              </>
            ) : (
              <em className={classes.split}>split booking</em>
            )}
          </React.Fragment>
        );
      })}
  </div>
);

function SingleSplit({ split, transaction }) {
  return (
    <Link
      to={`/accounts/${split.account.gnuCashId}#tx-${transaction.gnuCashId}`}
    >
      {split.account.name}
    </Link>
  );
}

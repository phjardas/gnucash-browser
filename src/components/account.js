import { Link } from 'gatsby';
import React from 'react';
import Transactions from './transactions';

export default ({ account }) => (
  <>
    <h1>
      {account.name} <small>({account.type})</small>
    </h1>
    {account.parentAccount && (
      <p>
        Parent:{' '}
        <Link to={`/accounts/${account.parentAccount.gnuCashId}`}>
          {account.parentAccount.name}{' '}
          <small>({account.parentAccount.type})</small>
        </Link>
      </p>
    )}
    {account.childAccounts.length > 0 && (
      <>
        <h2>Child Accounts</h2>
        <ul>
          {account.childAccounts.map((child) => (
            <li key={child.id}>
              <Link to={`/accounts/${child.gnuCashId}`}>
                {child.name} <small>({child.type})</small>
              </Link>
            </li>
          ))}
        </ul>
      </>
    )}
    {account.transactions.length > 0 && (
      <Transactions transactions={account.transactions} account={account} />
    )}
  </>
);

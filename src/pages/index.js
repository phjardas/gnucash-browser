import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

export const query = graphql`
  query AccountsQuery {
    accounts: allGnuCashAccount(filter: { type: { eq: "ROOT" } }) {
      nodes {
        gnuCashId
        name
        type
      }
    }
  }
`;

export default function IndexPage({ data }) {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Accounts</h1>
      <ul>
        {data.accounts.nodes.map((account) => (
          <li key={account.gnuCashId}>
            <Link to={`/accounts/${account.gnuCashId}`}>
              {account.name} <small>({account.type})</small>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

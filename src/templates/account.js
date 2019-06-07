import { graphql } from 'gatsby';
import React from 'react';
import Account from '../components/account';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default ({ data: { account } }) => (
  <Layout>
    <SEO title={account.name} />
    <Account account={account} />
  </Layout>
);

export const query = graphql`
  query($id: String!) {
    account: gnuCashAccount(id: { eq: $id }) {
      id
      gnuCashId
      name
      type
      parentAccount {
        id
        gnuCashId
        name
        type
      }
      childAccounts {
        id
        gnuCashId
        name
        type
      }
      transactions {
        id
        gnuCashId
        description
        postedAt
        splits {
          id
          gnuCashId
          value {
            denom
            nom
          }
          account {
            id
            gnuCashId
            name
            type
          }
        }
      }
    }
  }
`;

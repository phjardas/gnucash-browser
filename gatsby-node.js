exports.createPages = async function({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allGnuCashAccount {
        nodes {
          id
          gnuCashId
        }
      }
    }
  `);

  data.allGnuCashAccount.nodes.forEach(({ id, gnuCashId }) => {
    actions.createPage({
      path: `/accounts/${gnuCashId}`,
      component: require.resolve(`./src/templates/account.js`),
      context: { id },
    });
  });
};

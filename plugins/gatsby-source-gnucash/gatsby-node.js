const fs = require('fs');
const { parseGnucash } = require('gnucash');
const {
  AccountNode,
  CommodityNode,
  TransactionNode,
  SplitNode,
  generateNodeId,
} = require('./nodes');

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  const source = fs.createReadStream('MyGnucashFile.gnucash');
  const { book } = await parseGnucash(source);

  book.commodities.forEach((commodity) => createNode(CommodityNode(commodity)));

  const findAccount = (accountId) =>
    book.accounts.find((a) => a.id === accountId);

  const findChildAccounts = (parentId) =>
    book.accounts.filter((a) => a.parentId === parentId);

  const findTransactions = (accountId) =>
    book.transactions.filter((tx) =>
      tx.splits.some((s) => s.accountId === accountId)
    );

  book.accounts.forEach((account) => {
    const parent = findAccount(account.parentId);
    const children = findChildAccounts(account.id);
    const transactions = findTransactions(account.id);

    createNode(
      AccountNode({
        ...account,
        parentAccount___NODE: parent
          ? generateNodeId('Account', parent.id)
          : undefined,
        childAccounts___NODE: children.map((c) =>
          generateNodeId('Account', c.id)
        ),
        transactions___NODE: transactions.map((t) =>
          generateNodeId('Transaction', t.id)
        ),
      })
    );
  });

  book.transactions.forEach((tx) => {
    tx.splits.forEach((split) => {
      const splitData = {
        ...split,
        transaction___NODE: generateNodeId('Transaction', tx.id),
        account___NODE: generateNodeId('Account', split.accountId),
      };
      delete splitData.accountId;
      createNode(SplitNode(splitData));
    });

    const txData = {
      ...tx,
      splits___NODE: tx.splits.map((s) => generateNodeId('Split', s.id)),
    };
    delete txData.splits;
    createNode(TransactionNode(txData));
  });
};

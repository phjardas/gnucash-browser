const createNodeHelpers = require('gatsby-node-helpers').default;

const { createNodeFactory, generateNodeId } = createNodeHelpers({
  typePrefix: `GnuCash`,
});

exports.AccountNode = createNodeFactory('Account');
exports.CommodityNode = createNodeFactory('Commodity');
exports.TransactionNode = createNodeFactory('Transaction');
exports.SplitNode = createNodeFactory('Split');

exports.generateNodeId = generateNodeId;

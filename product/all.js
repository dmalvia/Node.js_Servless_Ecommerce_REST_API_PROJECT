// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');

module.exports = async function (params, context) {
  const productTable = aircode.db.table('product');
  
  const products = await productTable
  .where()
  .find();

  const count = await productTable
  .where()
  .count();

  return {
    count,
    products
  }
};

// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const { verifyToken } = require('../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);
  console.log(tokenUser);
  if(tokenUser != null && tokenUser.isAdmin) {
    const { _id } = params;
    
    const productTable = aircode.db.table('product');
    
    const product = await productTable
    .where({_id})
    .findOne();

    try {
      const result = await productTable.delete(product);
      context.status(204);
      return {
        result
      }
    }catch(err) {
      context.status(500);
      return {
        'message': err.message
      }
    }
  } else {
  
    context.status(401);
    return {
      'message': 'Token invalid or user is not authorized'
    }
  }
};

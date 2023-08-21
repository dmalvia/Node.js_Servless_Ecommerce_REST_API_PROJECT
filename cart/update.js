// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const { verifyToken } = require('../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);
  console.log(tokenUser);
  if(tokenUser != null) {
    const {_id, products} = params;
    const cartTable = aircode.db.table('cart');

    try {
      const cart = await cartTable
      .where({_id})
      .findOne();
      const result = await cartTable.save(params);
      context.status(200);
      return result   
    }catch (err) {
      context.status(500);
      return {
        'message': err.message
      }
    }
  } else {
    context.status(401);
    return {"message": "Token invalid or user is not authorized!"};
  } 
};

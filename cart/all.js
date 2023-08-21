// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const { verifyToken } = require('../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);

  if(tokenUser != null && tokenUser.isAdmin) {
  
    const cartTable = aircode.db.table('cart');
    
    const carts = await cartTable
    .where()
    .find();
  
    const count = await cartTable
    .where()
    .count();
  
    return {
      count,
      carts
    }
  } else {
    context.status(401);
    return {"message": "Token invalid or user is not authorized!"};
  }
};

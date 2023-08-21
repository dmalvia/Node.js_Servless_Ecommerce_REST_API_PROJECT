// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const { verifyToken } = require('../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);
  if(tokenUser != null) {
    const {products} = params;

    if(!products) {
      context.status(400);
      return {
        'message': 'Products, amount and address is mandatory'
      }
    }
    
    const cartTable = aircode.db.table('cart');

    try {
      const cart = {
        ...params,
        userId: tokenUser._id
      }
      const result = await cartTable.save(cart);
      context.status(201);
      return {
        result
      }
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

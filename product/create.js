// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const { verifyToken } = require('../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);
  if(tokenUser != null && tokenUser.isAdmin) {
    const {title, description, inStock, category, price, color, size} = params;

    if(!title || !category || !price) {
      context.status(400);
      return {
        'message': 'Title, category and price is mandatory'
      }
    }
    const productTable = aircode.db.table('product');

    const productExist = await productTable
    .where ({title})
    .findOne();

    if(productExist) {
      context.status(400);
      return {'message': 'Product already exist'}
    }

    try {
      const result = await productTable.save(params);
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

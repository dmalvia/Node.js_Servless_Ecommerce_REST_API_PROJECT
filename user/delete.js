// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const { verifyToken } = require('../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);
  console.log(tokenUser);
  if(tokenUser != null) {
    const { _id } = tokenUser;
    
    const userTable = aircode.db.table('user');
    
    const user = await userTable
    .where({_id})
    .findOne();

    try {
      const result = await userTable.delete(user);
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

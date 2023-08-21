// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { verifyToken } = require('../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);
  if(tokenUser != null) {
    try {
        const {amount, currency, paymentMethodType} = params;
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency,
          payment_method_types: [paymentMethodType]
        });

        console.log("The payment intent is : ", paymentIntent);
        const {client_secret} = paymentIntent;
        context.status(200);
        return {
        client_secret
        }
    } catch(err) {
      context.status(400);
      return {
        'message' : err.message
      }
    }
    
  } else {
    context.status(401);
    return {"message": "Token invalid or user is not authorized!"};
  }
};

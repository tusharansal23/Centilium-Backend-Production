const stripe = require('stripe')('your-secret-key');

async function retrievePaymentIntent(paymentIntentId) {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  console.log('Payment Intent retrieved:', paymentIntent);
}

// Example usage
retrievePaymentIntent('payment_intent_id_here');

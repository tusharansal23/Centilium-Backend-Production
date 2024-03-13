const stripe = require('stripe')('your-secret-key');

async function chargeCustomer(customerId, amount, currency = 'usd') {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customerId,
  });

  console.log('Payment successful:', paymentIntent.id);
}

// Example usage
chargeCustomer('customer_id_here', 1000); // Charging $10.00

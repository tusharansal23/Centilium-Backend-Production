// Require necessary packages
const stripe = require('stripe')('sk_test_51OXiwpSBXSrOXlv5sqcz0xi9UhhekPz47uxstE7tKo4HRNrLq3L2YJo5sieYz8OnEeE7Rd2z3713ggTV2PlhmjK000svg7likv');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const chatbotApp = require('./chatbot');

const nodemailer = require('nodemailer');
// Load environment variables from a .env file
dotenv.config();

// Create an Express app
const app = express();

// Use express.json() middleware for parsing JSON in the request body
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(chatbotApp);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tusharansal23@gmail.com',
    pass: 'mbat gegn ambc jdab',
  },
});

app.post('/send-email', async (req, res) => {
  const { email, date } = req.body;

  console.log("entered");
  const mailOptions = {
    from: 'tusharansal23@gmail.com',
    to: email,
    subject: 'Meeting Reminder',
    text: `This is a reminder for your meeting on ${date}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${email}`);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Set up a route to handle Stripe payments
app.post('/create-checkout-session',async(req,res) => {
    const  {items}  =  req.body;

  console.log("items = ",items);
  // Create a PaymentIntent with the order amount and currency

  const lineItems = items.map((item)=>({

    price_data:{
      currency:"usd",
      product_data:{
        name: item.CallType
      },
      unit_amount:item.Price*100,
    },
    quantity:item.Quantity,
  }));
  console.log("line = ",lineItems);
  //console.log("stripe = ",stripe);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/Success',
      cancel_url: 'http://localhost:3000/Cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Checkout Session:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Start the Express app on port 3000
const port = 4242;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


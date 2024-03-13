const makePayment = async () => { 
    const stripe = await loadStripe("your-publishable-key"); 
    const body = { product }; 
    const headers = { 
      "Content-Type": "application/json", 
    }; 
 
    const response = await fetch( 
      "http://localhost:4000/api/create-checkout-session", 
      { 
        method: "POST", 
        headers: headers, 
        body: JSON.stringify(body), 
      } 
    ); 
 
    const session = await response.json(); 
 
    const result = stripe.redirectToCheckout({ 
      sessionId: session.id, 
    }); 
 
    if (result.error) { 
      console.log(result.error); 
    } 
  }; 
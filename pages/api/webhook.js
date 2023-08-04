import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_644b94695edf47aa43c15f566bf7c62a30017338984a3e60ad8010a59f4dc647";

export default async function handler(request, response) {
  await mongooseConnect();

  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(request),
      sig,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      console.log(data);
      const orderId = data.metadata.orderId;
      const payed = data.payment_status === "paid";
      if (orderId && payed) {
        Order.findByIdAndUpdate(orderId, { paid: true });
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
}

export const config = {
  api: {
    bodyParcer: false,
  },
};

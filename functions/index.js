const functions = require("firebase-functions");
const admin = require("firebase-admin");
//import { useData } from "../parts/memory";

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
  const stripe = require("stripe")(functions.config().stripe.secret_key);
  // const { profile } = useData();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `http://localhost:5173/payment-success`,
    cancel_url: `http://localhost:5173/payment-cancel`,

    line_items: data.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "czk",
        unit_amount: item.price * 100,
        product_data: {
          name: item.name,
        },
      },
    })),
  });
  return {
    id: session.id,
  };
});

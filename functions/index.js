const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret_key);
admin.initializeApp();

// Create Stripe Checkout session
exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
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

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const stripe = require("stripe")(functions.config().stripe.token);
  let event;

  try {
    const whSec = functions.config().stripe.payments_webhook_secret;

    event = stripe.webhooks.constructEvent(req.rawBody, req.headers["stripe-signature"], whSec);
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.");
    return res.sendStatus(400);
  }

  const dataObject = event.data.object;

  await admin.firestore().collection("orders").doc(dataObject.id).set(
    {
      checkoutSessionId: dataObject.id,
      paymentStatus: dataObject.payment_status,
      // shippingInfo: dataObject.shipping,
      amountTotal: dataObject.amount_total,
    },
    { merge: true },
  );

  return res.sendStatus(200);
});

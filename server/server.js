// server.js

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

const initializeStoreItems = async () => {
  const { fetchData } = await import("../src/components/cart/PaymentCatalogData.js"); // Dynamic import
  const catalog = await fetchData(); // Fetch catalog data

  return catalog.map((item) => {
    return { id: item.id, priceInCents: item.price * 100, name: item.name, images: item.images.map((img) => img.url) };
  });
};

app.post("/create-checkout-session", async (req, res) => {
  try {
    const storeItems = await initializeStoreItems();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.find((tempItem) => tempItem.id === item.id);
        return {
          price_data: {
            currency: "czk",
            product_data: {
              name: storeItem.name,
              images: storeItem.images,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

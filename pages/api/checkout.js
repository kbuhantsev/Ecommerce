import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.json("should be a POST request");
  }

  await mongooseConnect();

  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;

  const uniqueIds = [...new Set(cartProducts)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let lineItems = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = cartProducts.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      lineItems.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: quantity + productInfo.price * 100,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    lineItems,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    customer_email: email,
    success_url: process.env.URL + "/cart?success=1",
    cancel_url: process.env.URL + "/cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
  });

  res.json({
    url: session.url,
  }); //redirect()
}

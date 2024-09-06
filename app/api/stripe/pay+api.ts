import { Stripe } from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { payment_method_id, payment_intent_id, cutomer_id } = body;
    if (!payment_method_id || !payment_intent_id || !cutomer_id) {
      return new Response("Entre all Data to process ", { status: 400 });
    }
    const paymentMethod = await stripe.paymentMethods.attach(
      payment_method_id,
      {
        customer: cutomer_id,
      }
    );
    const result = await stripe.paymentIntents.confirm(payment_intent_id, {
      payment_method: paymentMethod.id,
    });
    return new Response(
      JSON.stringify({
        success: true,
        result,
        message: "Payment Successfull",
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error,
        message: "Payment Failed",
      }),
      { status: 500 },
    );
  }
}

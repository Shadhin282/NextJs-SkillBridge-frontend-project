import { cookies } from "next/headers";

export const PaymentService = {
  createPaymentIntent: async function (amount: number, currency: string = "usd") {
    
    try {
      const cookieStore = await cookies();
      // Using localhost here because the onrender backend doesn't have the new payment routes yet.
      // Make sure your backend runs on port 4000.
      const res = await fetch(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/payments/create-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify({ amount, currency }),
        }
      );

      const data = await res.json();
      if (!res.ok || data.success === false) {
        return { data: null, error: { message: data.message || "Failed to create payment intent" } };
      }

      return { data: data.data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Internal server error connecting to payment service" } };
    }
  },
};

"use server"
import { PaymentService } from "../../services/payment.service";

export const createPaymentIntentAction = async (amount: number) => {
    // Calling the service to create a payment intent
    const res = await PaymentService.createPaymentIntent(amount, "usd");
    return res;
}

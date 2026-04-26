'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Initialize stripePromise outside of component to avoid recreating it
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

interface CheckoutFormProps {
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
  amount: number;
}

function CheckoutForm({ onSuccess, onCancel, amount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    // Confirm the payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required', // Do not automatically redirect so we can handle success here
    });

    if (error) {
      toast.error(error.message || 'Payment failed');
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      toast.success('Payment successful!');
      onSuccess(paymentIntent.id);
    } else {
      toast.error('Payment not completed.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-muted p-4 rounded-md mb-4 text-center">
        <p className="text-sm text-muted-foreground">Total amount to pay</p>
        <p className="text-3xl font-bold">${amount.toFixed(2)}</p>
      </div>

      <PaymentElement />

      <div className="flex flex-col-reverse gap-4 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          className="w-full" 
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="w-full" 
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
        </Button>
      </div>
    </form>
  );
}

interface PaymentModalProps {
  clientSecret: string;
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
  amount: number;
}

export default function PaymentModal({ clientSecret, onSuccess, onCancel, amount }: PaymentModalProps) {
  return (
    <div className="p-1">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm 
          onSuccess={onSuccess} 
          onCancel={onCancel}
          amount={amount}
        />
      </Elements>
    </div>
  );
}

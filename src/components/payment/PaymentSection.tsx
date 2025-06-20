"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

interface PaymentSectionProps {
  servicePrice: string;
  serviceId: string;
  serviceName: string;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string);

const PaymentSection: React.FC<PaymentSectionProps> = ({
  servicePrice,
  serviceId,
  serviceName,
}) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        price={servicePrice}
        serviceId={serviceId}
        serviceName={serviceName}
      />
    </Elements>
  );
};

export default PaymentSection;

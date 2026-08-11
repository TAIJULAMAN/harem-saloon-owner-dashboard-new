import React from "react";
import { PaymentMethodDetails } from "@/components/saloonOwner/budgeting/payment-methods/PaymentMethodDetails";
import { MOCK_PAYMENT_METHODS } from "@/components/saloonOwner/budgeting/data";

export default async function PaymentMethodDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const method = MOCK_PAYMENT_METHODS.find(m => m.id === id) || MOCK_PAYMENT_METHODS[0];

  return (
    <div className="h-full">
      <PaymentMethodDetails method={method} />
    </div>
  );
}

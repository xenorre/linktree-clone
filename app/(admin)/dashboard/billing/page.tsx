"use client";

import { PricingTable } from "@clerk/clerk-react";

function BillingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-10 text-center md:text-left">
        Manage your billing
      </h1>
      <PricingTable />
    </div>
  );
}

export default BillingPage;

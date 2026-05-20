'use client';

import { PricingCard } from './PricingCard';
import { PRICING_PLANS } from '../../../constants/pricing.constants';

export function PricingCards() {
  return (
    <div className="flex flex-wrap gap-8 mb-14 max-w-7xl mx-auto">
      {PRICING_PLANS.map((plan) => (
        <PricingCard
          key={plan.name}
          name={plan.name}
          price={plan.price}
          description={plan.description}
          buttonText={plan.buttonText}
          buttonVariant={plan.buttonVariant}
          isCustom={'isCustom' in plan ? plan.isCustom : undefined}
        />
      ))}
    </div>
  );
}
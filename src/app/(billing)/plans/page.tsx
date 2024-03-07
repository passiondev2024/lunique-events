// import { CheckoutButton } from "@/components/partials/billing/checkout-button";
// import { api } from "@/trpc/server";
// import { type Plan } from "@prisma/client";

// export const dynamic = "auto";

export default function Plans() {
  // const plans = await api.billing.getAllPlans.query();

  // if (!plans.length) {
  //   return <p>No plans available.</p>;
  // }

  return (
    <div>
      <h2>Plans</h2>
      {/* 
      <div className="mb-5 mt-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
        {plans.map((plan, index) => {
          return <Plan key={`plan-${index}`} plan={plan} />;
        })}
      </div> */}
    </div>
  );
}

// export function Plan({ plan }: { plan: Plan }) {
//   const { description, productName, name, price } = plan;

//   return (
//     <div>
//       <h2>
//         {productName} ({name})
//       </h2>

//       {description ? (
//         <div
//           dangerouslySetInnerHTML={{
//             // Ideally sanitize the description first.
//             __html: description,
//           }}
//         ></div>
//       ) : null}

//       <p>${price}</p>

//       <CheckoutButton plan={plan} embed={true}>
//         Get Plan
//       </CheckoutButton>
//     </div>
//   );
// }

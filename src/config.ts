import { type PlanFeatures } from "@prisma/client";

type PlanType = "personal" | "professional";

export const PLAN_MAP: Record<PlanType, Omit<PlanFeatures, "id">> = {
  personal: {
    images: 50,
    branding: true,
  },
  professional: {
    images: 500,
    branding: false,
  },
} as const;

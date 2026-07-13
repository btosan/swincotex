import type { ServiceIcon as PrismaServiceIcon } from "@prisma/client";

// Prisma enums can't contain hyphens, so the DB stores "hard_hat" while
// the existing <ServiceIcon> component (and the old services-data.ts
// union type) expects "hard-hat". This just converts underscore back
// to hyphen — every other icon name is already identical either way.
export function toComponentIcon(icon: PrismaServiceIcon): string {
  return icon.replace(/_/g, "-");
}

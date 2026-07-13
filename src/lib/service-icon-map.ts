import {
  Flame,
  Wrench,
  Drill,
  HardHat,
  Building2,
  ShieldCheck,
  Waypoints,
  ClipboardList,
  Settings2,
  Layers,
  Recycle,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@prisma/client";

// Prisma enum values use underscores (hyphens aren't valid in Prisma
// enums) — this maps them back to the lucide-react components and to
// the human-readable labels shown in the admin form.
export const serviceIconMap: Record<ServiceIcon, { component: LucideIcon; label: string }> = {
  flame: { component: Flame, label: "Flame" },
  wrench: { component: Wrench, label: "Wrench" },
  drill: { component: Drill, label: "Drill" },
  hard_hat: { component: HardHat, label: "Hard Hat" },
  building_2: { component: Building2, label: "Building" },
  shield_check: { component: ShieldCheck, label: "Shield Check" },
  waypoints: { component: Waypoints, label: "Waypoints" },
  clipboard_list: { component: ClipboardList, label: "Clipboard List" },
  settings_2: { component: Settings2, label: "Settings" },
  layers: { component: Layers, label: "Layers" },
  recycle: { component: Recycle, label: "Recycle" },
  users: { component: Users, label: "Users" },
};

export const serviceIconOptions = Object.entries(serviceIconMap) as [
  ServiceIcon,
  { component: LucideIcon; label: string },
][];

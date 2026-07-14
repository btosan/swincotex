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
  type LucideProps,
} from "lucide-react";
import type { Service } from "@/lib/services-data";

const iconMap: Record<Service["icon"], React.ComponentType<LucideProps>> = {
  flame: Flame,
  wrench: Wrench,
  drill: Drill,
  "hard-hat": HardHat,
  "building-2": Building2,
  "shield-check": ShieldCheck,
  waypoints: Waypoints,
  "clipboard-list": ClipboardList,
  "settings-2": Settings2,
  layers: Layers,
  recycle: Recycle,
  users: Users,
};

export default function ServiceIcon({ icon, ...props }: { icon: Service["icon"] } & LucideProps) {
  const Icon = iconMap[icon];
  return <Icon {...props} />;
}
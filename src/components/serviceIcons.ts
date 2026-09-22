import {
  AppWindow,
  Building2,
  HardHat,
  Monitor,
  Pencil,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "../data/services";

export const serviceIcons: Record<Service["icon"], LucideIcon> = {
  office: Pencil,
  computer: Monitor,
  construction: HardHat,
  systems: AppWindow,
  mobile: Smartphone,
  digital: Building2,
};

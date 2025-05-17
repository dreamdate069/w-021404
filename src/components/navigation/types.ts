
import { LucideIcon } from 'lucide-react';

export interface NavItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  active?: boolean;
}

export interface ExternalLinkItem {
  icon: LucideIcon;
  label: string;
  url: string;
}

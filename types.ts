import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  active?: boolean;
}

export interface MetricCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  colorClass: string;
  iconColorClass: string;
}

export interface TagProps {
  label: string;
}
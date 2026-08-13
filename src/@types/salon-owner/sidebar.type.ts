import { ComponentType } from "react";

export interface NavItem {
  label: string;
  href?: string;
  icon: ComponentType<any>;
  children?: NavItem[];
}

export interface SidebarTheme {
  activeBg: string;
  activeText: string;
  inactiveText: string;
  hoverBg: string;
  subActiveBg: string;
  subInactiveBg: string;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavItem[];
  theme?: SidebarTheme;
  logoHref: string;
}

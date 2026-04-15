// src/types/menu.ts
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  tags?: string[];
  available: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon?: string;
  items: MenuItem[];
}

// src/types/menu.ts  (dodaj pole colorScheme)
export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  borderRadius: string;
  layout: string;
  colorScheme: string;
}

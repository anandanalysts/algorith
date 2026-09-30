export type PageView = 
  | 'home'
  | 'products'
  | 'solutions'
  | 'technology'
  | 'about'
  | 'contact';

export interface NavItem {
  id: PageView;
  label: string;
  hash: string;
  badge?: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', hash: '#' },
  { id: 'products', label: 'Products', hash: '#products' },
  { id: 'solutions', label: 'Solutions', hash: '#solutions' },
  { id: 'technology', label: 'Technology', hash: '#technology' },
  { id: 'about', label: 'About', hash: '#about' },
  { id: 'contact', label: 'Contact', hash: '#contact' },
];

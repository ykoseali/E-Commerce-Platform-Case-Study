export type UserRole = 'admin' | 'customer';

export interface User {
  _id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  addresses: Address[];
  favorites?: string[]; // product IDs
}

export interface Address {
  _id?: string;
  street: string;
  city: string;
  zip: string;
  country: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags?: string[];
  images: string[];
  specs?: Record<string, string>;
  stock: number;
  sizeOptions?: string[];
  colorOptions?: string[];
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  user: string;
  items: CartItem[];
  shippingAddress: Address;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface Review {
  _id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  approved: boolean;
}

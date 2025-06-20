import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

export interface AppState {
  products: {
    products: Product[]; 
    loading: boolean; 
    error: any; 
  };
  cart: {
    items: CartItem[];
  };
}
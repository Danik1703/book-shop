import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

export interface AppState {
  products: {
    products: Product[]; // Все загруженные товары
    loading: boolean; // Флаг загрузки
    error: any; // Ошибка, если есть
  };
  cart: {
    items: CartItem[]; // Элементы в корзине
  };
}
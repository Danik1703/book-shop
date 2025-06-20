import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { CartItem } from '../../models/cart-item.model';

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.addToCart, (state, { product }) => {
    const existingItem = state.items.find(item => item.product.id === product.id);
    if (existingItem) {
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    } else {
      return {
        ...state,
        items: [...state.items, { product, quantity: 1 }],
      };
    }
  }),
  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter(item => item.product.id !== productId),
  })),
  on(CartActions.updateCartQuantity, (state, { productId, quantity }) => ({
    ...state,
    items: state.items
      .map(item => (item.product.id === productId ? { ...item, quantity } : item))
      .filter(item => item.quantity > 0),
  }))
);

import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { CartItem } from '../../models/cart-item.model';

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = {
  items: [],
};

function saveCartToLocalStorage(cartState: CartState) {
  localStorage.setItem('cart', JSON.stringify(cartState));
}

function loadCartFromLocalStorage(): CartState {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : initialCartState;
}

export const cartReducer = createReducer(
  loadCartFromLocalStorage(),

  on(CartActions.addToCart, (state, { product }) => {
    const existingItem = state.items.find(item => item.product.id === product.id);
    const updatedState = existingItem
      ? {
          ...state,
          items: state.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      : {
          ...state,
          items: [...state.items, { product, quantity: 1 }],
        };

    saveCartToLocalStorage(updatedState);
    return updatedState;
  }),

  on(CartActions.removeFromCart, (state, { productId }) => {
    const updatedState = {
      ...state,
      items: state.items.filter(item => item.product.id !== productId),
    };
    saveCartToLocalStorage(updatedState);
    return updatedState;
  }),

  on(CartActions.updateCartQuantity, (state, { productId, quantity }) => {
    const updatedState = {
      ...state,
      items: state.items
        .map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
        .filter(item => item.quantity > 0),
    };
    saveCartToLocalStorage(updatedState);
    return updatedState;
  }),

  on(CartActions.clearCart, (state) => {
    const updatedState = { ...state, items: [] };
    saveCartToLocalStorage(updatedState);
    return updatedState;
  })
);

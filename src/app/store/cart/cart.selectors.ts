import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

// Выбрать часть состояния, относящуюся к корзине
export const selectCartState = createFeatureSelector<CartState>('cart');

// Выбрать все элементы корзины
export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

// Выбрать общее количество товаров в корзине
export const selectCartTotalQuantity = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

// Выбрать общую стоимость товаров в корзине
export const selectCartTotalPrice = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.product.price * item.quantity, 0)
);
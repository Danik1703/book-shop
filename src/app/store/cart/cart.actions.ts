import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const addToCart = createAction(
  '[Корзина] Добавить в корзину',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Корзина] Удалить из корзины',
  props<{ productId: string }>()
);

export const updateCartQuantity = createAction(
  '[Корзина] Обновить количество в корзине',
  props<{ productId: string; quantity: number }>()
);

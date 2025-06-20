import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const loadProducts = createAction('[Список товарів] Завантажити товари');

export const loadProductsSuccess = createAction(
  '[Список товарів] Завантаження товарів успішне',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Список товарів] Помилка завантаження товарів',
  props<{ error: any }>()
);

export const filterProducts = createAction(
  '[Список товарів] Фільтрувати товари',
  props<{
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
  }>()
);

export const sortProducts = createAction(
  '[Список товарів] Сортувати товари',
  props<{ sortBy: 'popularity' | 'price' | 'newest' | 'none' }>()
);

import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

// Загрузить товары
export const loadProducts = createAction('[Список товаров] Загрузить товары');

// Товары успешно загружены
export const loadProductsSuccess = createAction(
  '[Список товаров] Загрузка товаров успешно',
  props<{ products: Product[] }>() // Передаем загруженные товары
);

// Ошибка при загрузке товаров
export const loadProductsFailure = createAction(
  '[Список товаров] Загрузка товаров с ошибкой',
  props<{ error: any }>() // Передаем информацию об ошибке
);

// Отфильтровать товары
export const filterProducts = createAction(
  '[Список товаров] Отфильтровать товары',
  props<{
    category?: string; // Категория для фильтрации
    minPrice?: number; // Минимальная цена
    maxPrice?: number; // Максимальная цена
    minRating?: number; // Минимальный рейтинг
  }>()
);

// Отсортировать товары
export const sortProducts = createAction(
  '[Список товаров] Отсортировать товары',
  props<{ sortBy: 'popularity' | 'price' | 'newest' | 'none' }>() // Тип сортировки
);
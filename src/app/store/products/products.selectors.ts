import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

// Выбрать часть состояния, относящуюся к продуктам
export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

// Выбрать все исходные продукты
export const selectAllProducts = createSelector(
  selectProductsState,
  (state) => state.products
);

// Выбрать отфильтрованные и отсортированные продукты
export const selectFilteredProducts = createSelector(
  selectProductsState,
  (state) => state.filteredProducts
);

// Выбрать состояние загрузки продуктов
export const selectProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);

// Выбрать ошибку загрузки продуктов
export const selectProductsError = createSelector(
  selectProductsState,
  (state) => state.error
);
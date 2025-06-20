import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { Product } from '../../models/product.model';

export interface ProductsState {
  products: Product[]; // Исходный список всех товаров
  filteredProducts: Product[]; // Отфильтрованный и отсортированный список товаров
  loading: boolean; // Флаг загрузки
  error: any; // Информация об ошибке
}

export const initialProductsState: ProductsState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
};

export const productsReducer = createReducer(
  initialProductsState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true, // Начинаем загрузку
    error: null,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products: products, // Сохраняем все загруженные товары
    filteredProducts: products, // Изначально отфильтрованные товары - это все товары
    loading: false, // Загрузка завершена
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false, // Загрузка завершена с ошибкой
    error: error, // Сохраняем ошибку
  })),
  on(
    ProductsActions.filterProducts,
    (state, { category, minPrice, maxPrice, minRating }) => {
      let filtered = [...state.products]; // Начинаем с исходных товаров

      if (category && category !== 'All') {
        filtered = filtered.filter((product) => product.category === category);
      }
      if (minPrice !== undefined) {
        filtered = filtered.filter((product) => product.price >= minPrice);
      }
      if (maxPrice !== undefined) {
        filtered = filtered.filter((product) => product.price <= maxPrice);
      }
      if (minRating !== undefined) {
        filtered = filtered.filter((product) => product.rating >= minRating);
      }

      return {
        ...state,
        filteredProducts: filtered, // Обновляем отфильтрованный список
      };
    }
  ),
  on(ProductsActions.sortProducts, (state, { sortBy }) => {
    let sorted = [...state.filteredProducts]; // Сортируем текущий отфильтрованный список

    switch (sortBy) {
      case 'popularity':
        sorted.sort((a, b) => b.popularity - a.popularity); // По убыванию популярности
        break;
      case 'price':
        sorted.sort((a, b) => a.price - b.price); // По возрастанию цены
        break;
      case 'newest':
        sorted.sort(
          (a, b) => b.releaseDate.getTime() - a.releaseDate.getTime() // По убыванию даты выпуска
        );
        break;
      case 'none':
      default:
        // Возвращаемся к исходному порядку, если доступно, или ничего не делаем
        sorted = [...state.products];
        break;
    }
    return {
      ...state,
      filteredProducts: sorted, // Обновляем отсортированный список
    };
  })
);
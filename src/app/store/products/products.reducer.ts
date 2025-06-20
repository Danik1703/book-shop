import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { Product } from '../../models/product.model';

export interface ProductsState {
  products: Product[]; 
  filteredProducts: Product[]; 
  loading: boolean; 
  error: any; 
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
    loading: true, 
    error: null,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products: products, 
    filteredProducts: products, 
    loading: false, 
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false, 
    error: error, 
  })),
  on(
    ProductsActions.filterProducts,
    (state, { category, minPrice, maxPrice, minRating }) => {
      let filtered = [...state.products];

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
        filteredProducts: filtered, 
      };
    }
  ),
  on(ProductsActions.sortProducts, (state, { sortBy }) => {
    let sorted = [...state.filteredProducts]; 

    switch (sortBy) {
      case 'popularity':
        sorted.sort((a, b) => b.popularity - a.popularity); 
        break;
      case 'price':
        sorted.sort((a, b) => a.price - b.price); 
        break;
      case 'newest':
        sorted.sort(
          (a, b) => b.releaseDate.getTime() - a.releaseDate.getTime() 
        );
        break;
      case 'none':
      default:
    
        sorted = [...state.products];
        break;
    }
    return {
      ...state,
      filteredProducts: sorted, 
    };
  })
);
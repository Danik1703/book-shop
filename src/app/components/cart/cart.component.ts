import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item.model';
import { CartState } from '../../store/cart/cart.reducer';
import { removeFromCart, updateCartQuantity } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems$: Observable<CartItem[]>;

  constructor(private store: Store<{ cart: CartState }>) {
    this.cartItems$ = store.pipe(select(state => state.cart.items));
  }

  onRemove(productId: string) {
    this.store.dispatch(removeFromCart({ productId }));
  }

  onQuantityChange(productId: string, event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    const quantity = input.valueAsNumber;
    if (!isNaN(quantity) && quantity > 0) {
      this.store.dispatch(updateCartQuantity({ productId, quantity }));
    }
  }

  getTotalPrice(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}

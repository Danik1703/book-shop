import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { CartItem } from '../../models/cart-item.model';
import { CartState } from '../../store/cart/cart.reducer';
import { removeFromCart, updateCartQuantity, clearCart } from '../../store/cart/cart.actions';

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

    let quantity = input.valueAsNumber;

    if (isNaN(quantity) || quantity < 1) {
      this.store.dispatch(removeFromCart({ productId }));
    } else {
      this.store.dispatch(updateCartQuantity({ productId, quantity }));
    }
  }

  onClearCart() {
    this.store.dispatch(clearCart());
  }

  getTotalPrice(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  onCheckout() {
    this.cartItems$.pipe(take(1)).subscribe(items => {
      if (items.length === 0) {
        Swal.fire('Увага!', 'Кошик порожній. Додайте товари для замовлення.', 'warning');
        return;
      }

      Swal.fire('✅ Замовлення оформлено!', 'Ми надішлемо підтвердження на вашу пошту.', 'success');

      this.store.dispatch(clearCart());
    });
  }
}

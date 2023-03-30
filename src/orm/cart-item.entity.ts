import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryColumn({
    name: 'cart_id',
    type: 'uuid'
  })
  cartId: string;

  @PrimaryColumn({
    name: 'product_id',
    type: 'uuid'
  })
  productId: string;

  @ManyToOne(() => Cart, (cart) => cart.items, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Cart;

  @Column({
    name: 'count',
    type: 'int'
  })
  count: number;
}
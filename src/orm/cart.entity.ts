import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Order } from './order.entity';

export enum CART_STATUS {
    OPEN = 'OPEN',
    ORDERED = 'ORDERED'
}

@Entity('carts')
export class Cart {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid'
  })
  id: string;

  @Column({
    name: 'user_id',
    type: 'uuid'
  })
  userId: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'date'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'date'
  })
  updatedAt: Date;

  @Column({
    name: 'status',
    type: 'enum',
    enum: CART_STATUS,
    default: CART_STATUS.OPEN
  })
  status: CART_STATUS;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id'})
  items: CartItem[]

  @OneToOne(() => Order)
  order: Order;
}
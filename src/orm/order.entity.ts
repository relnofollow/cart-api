import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Cart } from "./cart.entity";

@Entity('orders')
export class Order {
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

    @OneToOne(() => Cart)
    @JoinColumn({
        name: 'cart_id'
    })
    cart: Cart;

    @Column({
        name: 'payment',
        type: 'json'
    })
    payment: any;

    @Column({
        name: 'delivery',
        type: 'json'
    })
    delivery: any;

    @Column({
        name: 'comments',
        type: 'text'
    })
    comments: string;

    @Column({
        name: 'status',
        type: 'text'
    })
    status: string;

    @Column({
        name: 'total',
        type: 'int'
    })
    total: number;
}
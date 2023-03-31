import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/orm/cart-item.entity';
import { Cart } from 'src/orm/cart.entity';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CartService {
 
  constructor(
    @InjectRepository(Cart) private cartsRepository: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemsRepository: Repository<CartItem>
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    return this.cartsRepository.findOne({
      where: {
        userId: userId
      },
      relations: [ 'items' ]
    })
  }

  async createByUserId(userId: string) {
    const cartId = uuidv4();

    const userCart = this.cartsRepository.create({
      id: cartId,
      userId,
      items: []
    });

    await this.cartsRepository.save(userCart);

    return userCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, items: CartItem[]): Promise<Cart> {
    const userCart = await this.findOrCreateByUserId(userId);

    userCart.items = items;
    await this.cartsRepository.save(userCart);

    return userCart;
  }

  async removeByUserId(userId: string): Promise<void> {
    await this.cartsRepository.delete({ userId });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orm/order.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private ordersRepository: Repository<Order>) {}

  findById(orderId: string): Promise<Order> {
    return this.ordersRepository.findOne(orderId);
  }

  async create(data: Order) {
    const orderId = uuidv4();

    const order = this.ordersRepository.create({
      ...data,
      id: orderId,
      status: 'IN_PROGRESS'
    });

    await this.ordersRepository.save(order);

    return order;
  }

  async update(orderId: string, data: any): Promise<void> {
    const order = await this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    await this.ordersRepository.update(orderId, data);
  }
}

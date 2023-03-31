import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orm/order.entity';
import { OrderService } from './services';

@Module({
  imports: [ TypeOrmModule.forFeature([Order]) ],
  providers: [ OrderService ],
  exports: [ OrderService ]
})
export class OrderModule {}

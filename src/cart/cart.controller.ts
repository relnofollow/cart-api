import { Controller, Get, Delete, Put, Body, Req, Post, UseGuards, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { BasicAuthGuard } from 'src/auth';
import { CART_STATUS } from 'src/orm/cart.entity';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { calculateCartTotal } from './models-rules';
import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const cart = await this.cartService.findOrCreateByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart, total: calculateCartTotal(cart) },
    }
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) { // TODO: validate body payload...
    const cart = await this.cartService.updateByUserId(getUserIdFromRequest(req), body.items)

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
        total: calculateCartTotal(cart),
      }
    }
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    await this.cartService.removeByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    }
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async checkout(@Req() req: AppRequest, @Body() body, @Res() res: Response) {
    const userId = getUserIdFromRequest(req);
    const cart = await this.cartService.findByUserId(userId);

    if (!(cart && cart.items.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;

      res.status(statusCode).json({
        statusCode,
        message: 'Cart is empty',
      });
    }

    const total = calculateCartTotal(cart);
    const order = await this.orderService.create({
      ...body, // TODO: validate and pick only necessary data
      userId,
      cart,
      total,
    });

    order.cart.status = CART_STATUS.ORDERED;
    await this.cartService.updateCart(order.cart);

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order }
    });
  }
}

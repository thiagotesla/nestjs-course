import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { OrderItemService } from "../services/order-item.service";
import { OrderService } from "../services/order.service";
import { ProductService } from "../services/product.service";
import { Result } from "src/modules/backoffice/models/result.model";
import { Order } from "../entities/order.entity";
import { OrderItem } from "../entities/order-item.entity";
import { OrderItemDto } from "../dtos/order-item.dto";

@Controller('v1/orders')
export class OrderController{
    constructor(
        private readonly orderService: OrderService,
        private readonly orderItemService: OrderItemService,
        private readonly productService: ProductService,
    ){}

    @Get(':order')
    async get(@Param('order') order: string){
        try{
            const orders = await this.orderService.getByNumber(order);
            return new Result(null, orders, true, null)
        }
        catch(error){
            throw new HttpException(new Result(
            'Não foi possível listar os pedidos. Confira seus dados.',
            false,
            null,
            error),
            HttpStatus.BAD_REQUEST
        );
    }
    }
    @Get(':customer')
    async getByCutomer(@Param('customer') customer: string){
        try{
            const orders = await this.orderService.getByCustomer(customer);
            return new Result(null, orders, true, null)
        }
        catch(error){
            throw new HttpException(new Result(
            'Não foi possível listar os pedidos. Confira seus dados.',
            false,
            null,
            error),
            HttpStatus.BAD_REQUEST
        );

        }
    }

    @Post()
    async post(@Body() model: OrderItemDto[]) {
        try {
            let order = new Order();
            order.customer = '12345678911';
            order.date = new Date();
            order.number = '1B2D3F5';
            order.items = [];
            await this.orderService.post(order);

            for (const item of model) {
                let product = await this.productService.findById(item.product);
                let orderItem = new OrderItem();
                orderItem.order = order;
                orderItem.product = product;
                orderItem.price = product.price;
                orderItem.quantity = item.quantity;
                await this.orderItemService.post(orderItem);
            };

            return new Result(null, model, true,  null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível criar seu pedido', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../entities/order.entity";

@Injectable()
export class OrderService{
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ){
    }

    async getByNumber(number: string): Promise<Order>{
        return await this.orderRepository.findOne({number: number})
    }

    async getByCustomer(customer: string): Promise<Order[]>{
        return await this.orderRepository.find({customer: customer})
    }

    async post(order: Order){
        await this.orderRepository.save(order);
    }
}

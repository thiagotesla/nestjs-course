import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity()
export class OrderItem{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(()=> Order, (o) => o.items)
    order: Order;

    @ManyToMany(() => Product, (p) => (p))
    product: Product;
    @Column('decimal')
    price: number;

    @Column('decimal')
    quantity: number;
}
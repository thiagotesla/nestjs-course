import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 8})
    number: string

    @Column('datetime')
    date: Date;

    @Column({length: 11})
    customer: string;

    @OneToMany(() => OrderItem, (oi) => oi.order)
    items: OrderItem[];

    @Column('decimal')
    price: number;

    @Column('decimal')
    quantity: number;
}

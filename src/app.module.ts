import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { StoreModule } from './modules/store/store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config'
import { Product } from './modules/store/entities/product.entity';
import { OrderItem } from './modules/store/entities/order-item.entity';
import { Order } from './modules/store/entities/order.entity';

@Module({
  imports: [
  
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      entities:
      [
        Product,
        Order,
        OrderItem,
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),
        BackofficeModule,
        StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

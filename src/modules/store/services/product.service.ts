import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";

@Injectable()
export class ProductService{
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ){}
    async findAll(): Promise<Product[]>{
        return await this.productRepository.find();
    }

    async findOne(id: number): Promise<Product>{
        return await this.productRepository.findOne(id)
    }

    async post(product: Product){
        return await this.productRepository.save(product);
    }

    async put(id: number, product: Product){
        return await this.productRepository.update(id, product);
    }
    
    async delete(id: number){
        return await this.productRepository.delete(id)
    }
}
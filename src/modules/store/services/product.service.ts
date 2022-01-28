import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";

@Injectable()
export class ProductService{
    constructor(
        @InjectRepository(Product)
        private readonly repositoryProduct: Repository<Product>
    ){}
    async getAll(): Promise<Product[]>{
        return await this.repositoryProduct.find();
    }

    async getOne(): Promise<Product>{
        return await this.repositoryProduct.findOne()
    }

    async post(product: Product){
        return await this.repositoryProduct.save(product);
    }

    async put(id: number, product: Product){
        return await this.repositoryProduct.update(id, product);
    }
    
    async delete(id: number){
        return await this.repositoryProduct.delete(id)
    }
}
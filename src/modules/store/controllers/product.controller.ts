import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { Result } from "src/modules/backoffice/models/result.model";
import { Product } from "../entities/product.entity";

@Controller('/v1/products')
export class ProductController{
    constructor(
        private readonly productService: ProductService,
        ){
    }

    @Get()
    async getAll(){
        try{
        const products = await this.productService.findAll();
            return new Result(
                'Lista de todos os produtos.',
                products,
                true,
                null,
            );
        }
        catch(error){
            throw new HttpException(new Result(
                'Não foi possivel listar os produtos.',
                false,
                null,
                error),
                HttpStatus.BAD_REQUEST
            ); 
        } 
    }

    @Get(':id')
    async getOne(@Param('id') id){
        try{
            const product = await this.productService.findById(id);
                return new Result(
                    'Produto requisitado.',
                    product,
                    true,
                    null,
                );
            }
            catch(error){
                throw new HttpException(new Result(
                    'Não foi possivel listar o produto.',
                    false,
                    null,
                    error),
                    HttpStatus.BAD_REQUEST
                ); 
            }
    }

    @Post()
    async post(@Body() model: Product){
        try{
        const product = await this.productService.post(model);
            return new Result(
                'Produto criado com sucesso.',
                product,
                true,
                null,
            );
        }
        catch(error){
            throw new HttpException(new Result(
                'Não foi possivel criar este produto.',
                false,
                null,
                error),
                HttpStatus.BAD_REQUEST
            ); 
        }    
    }

    @Put(':id')
    async update(@Param('id') id, @Body() model: Product){
        try{
            await this.productService.put(id, model);
            return new Result(
                'Produto alterado com sucesso.',
                model,
                true,
                null
            )
        }catch(error){
            throw new HttpException(new Result(
                'Não foi possivel alterar esse produto.',
                false,
                null,
                error),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        try{
            const product = await this.productService.delete(id);
            return new Result('Produto deletado com sucesso.',
            null,
            true,
            null)
        }catch(error){
            throw new HttpException(new Result(
                'Não foi possivel deletar esse produto.',
                null,
                false,
                error),
                HttpStatus.BAD_REQUEST
            );
        }
    }
}

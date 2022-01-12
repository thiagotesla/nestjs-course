import { Controller, Delete, Get, Post, Put } from "@nestjs/common";

@Controller('v1/customers')
export class CustomerController{
    @Get()
    get() {
        return 'Método Get';
    }

    getById(){
        return 'Método GetById';
    }

    @Post()
    post(){
        return 'Método Post';
    }

    @Put()
    put() {
        return 'Método Put';
    }

    @Delete()
    delete(){
        return 'Método Delete';
    }
}
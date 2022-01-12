import { Controller, Delete, Get, Post, Put } from "@nestjs/common";

@Controller()
export class CustomerController{
    @Get()
    get() {
        return 'Método Get';
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
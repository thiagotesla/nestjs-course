import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

@Controller('v1/customers')
export class CustomerController{
    @Get()
    get() {
        return 'Método Get';
    }
    @Get(':document')
    getById(@Param('document') document){
        return 'Método GetById ' + document;
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
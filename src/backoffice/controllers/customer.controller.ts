import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

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
    post(@Body() body){
        return body;
    }

    @Put()
    put(@Body() body) {
        return body;
    }

    @Delete()
    delete(){
        return 'Método Delete';
    }
}
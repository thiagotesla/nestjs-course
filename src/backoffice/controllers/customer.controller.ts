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

    @Put(':document')
    put(@Param('document') document, @Body() body) {
        return {
            customer: document,
            data: body,
        };
    }

    @Delete(':document')
    delete(@Param('document') document){
        return 'Usuário ' + document + ' deletado!';
    }
}
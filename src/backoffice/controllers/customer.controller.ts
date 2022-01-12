import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Customer } from "../models/customer.model";
import { Result } from "../models/result.model";

@Controller('v1/customers')
export class CustomerController{
    @Get()
    get() {
        return new Result(
        'Lista de todos os clientes',
        [],
        true,
        null
        );
    }
    @Get(':document')
    getById(@Param('document')document ){
        return new Result(
        'Cliente de CPF ' + document +".",
        {},
        true,
        null);
    }

    @Post()
    post(@Body() body: Customer){
        return new Result(
        'Cliente criado com sucesso!',
        [
        body.name,
        body.email,
        body.document
        ],
        true,
        null
        );
    }

    @Put(':document')
    put(@Param('document') document, @Body() body) {
        return new Result(
        'Cliente atualizado com sucesso!',
        body.name,
        true,
        null
        );
    }

    @Delete(':document')
    delete(@Param('document') document) {
        return new Result(
        'Cliente de CPF ' + document + ' deletado com sucesso.',
        null,
        true, 
        null
        );
    }
}
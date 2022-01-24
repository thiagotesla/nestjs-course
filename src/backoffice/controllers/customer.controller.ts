import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "src/interceptors/valitador.interceptor";
import { CreateCustomerContract } from "../contracts/customer.contract";
import { CreateCustomerDto } from "../dtos/create-customer.dto";
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
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    post(@Body() body: CreateCustomerDto){
        return new Result(
        'Cliente criado com sucesso!',
        [
        body.name,
        body.email,
        body.document,
        ],
        true,
        null
        );
    }

    @Put(':document')
    put(@Param('document') document, @Body() body: Customer) {
        return new Result(
        'Cliente de CPF ' + document + ' atualizado com sucesso!',
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
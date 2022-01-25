import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "src/interceptors/valitador.interceptor";
import { CreateCustomerContract } from "../contracts/customer.contract";
import { CreateCustomerDto } from "../dtos/create-customer.dto";
import { Customer } from "../models/customer.model";
import { Result } from "../models/result.model";
import { User } from "../models/user.model";
import { AccountService } from "../services/account.service";

@Controller('v1/customers')
export class CustomerController{
    constructor(private readonly accountService: AccountService){

    }
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
    async post(@Body() model: CreateCustomerDto){
        const user = await this.accountService.create(new User(model.document, model.password, true));
        return new Result('Cliente criado com sucesso!', user, true, null);
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
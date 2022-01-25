import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "src/interceptors/valitador.interceptor";
import { CreateCustomerContract } from "../contracts/customer.contract";
import { CreateCustomerDto } from "../dtos/create-customer.dto";
import { Customer } from "../models/customer.model";
import { Result } from "../models/result.model";
import { User } from "../models/user.model";
import { AccountService } from "../services/account.service";
import { CustomerService } from "../services/customer.service";

@Controller('v1/customers')
export class CustomerController{
    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService){

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
        try{
            const user = await this.accountService.create(new User(model.document, model.password, true));
        const customer = new Customer(model.name, model.email, model.document, null, null, null, null, user);
        const res = await this.customerService.create(customer);
        return new Result('Cliente criado com sucesso!', {name: customer.name, email: customer.email}, true, null);
        }
        catch(error){
            throw new HttpException(new Result('Email ou CPF já cadastrados.', false, null, error), HttpStatus.BAD_REQUEST); 
        }    
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
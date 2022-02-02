import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { Customer } from "../models/customer.model";
import { Result } from "../models/result.model";
import { User } from "../models/user.model";
import { CreditCard } from "../models/credit-card.model";
import { AccountService } from "../services/account.service";
import { CustomerService } from "../services/customer.service";
import { CreateCustomerDto } from "../dtos/customer/create-customer.dto";
import { UpdateCustomerDto } from "../dtos/customer/update-customer.dto";
import { QueryDto } from "../dtos/query.dto";
import { ValidatorInterceptor } from "src/interceptors/valitador.interceptor";
import { CreateCustomerContract } from "../contracts/customer/create-customer.contract";
import { UpdateCustomerContract } from "../contracts/customer/update-customer.contract";
import { CreateCreditCardContract } from "../contracts/customer/create-credit-card.contract";
import { CreateQueryContract } from "../contracts/customer/query.contract";

@Controller('v1/customers')
export class CustomerController{
    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService,
        ){
    }

    @Get()
    async getAll(){
        const customers = await this.customerService.findAll();
        return new Result(
            'Lista de todos os clientes',
            customers,
            true,
            null,
        );
    }

    @Get(':document')
    async getOne(@Param('document') document){
        const customer = await this.customerService.findOne({document});
        return new Result(
            'Cliente buscado: ',
            customer,
            true,
            null,
        );
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new CreateQueryContract()))
    async query(@Body() model: QueryDto){
        const customers = await this.customerService.query(model)
        return new Result('Query executada com sucesso!', customers, true, null)
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto){
        try{
        const user = await this.accountService.create(new User(model.document, model.password, ['user'], true));
        const customer = new Customer(model.name, model.email, model.document, null, null, null, null, user);
        await this.customerService.create(customer);
            return new Result(
                'Cliente criado com sucesso!',
                {name: customer.name, email: customer.email},
                true,
                null,
            );
        }
        catch(error){
            throw new HttpException(new Result(
                'Email ou CPF já cadastrados.',
                false,
                null,
                error),
                HttpStatus.BAD_REQUEST
            ); 
        }    
    }

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async update(@Param('document') document, @Body() model: UpdateCustomerDto){
        try{
            await this.customerService.update(document, model);
            return new Result('Cliente alterado com sucesso', model, true, null)
        }catch(error){
            throw new HttpException(new Result(
                'Não foi possivel alterar esse cliente.',
                false,
                null,
                error),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Post(':document/creditcard')
    @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract))
    async addCreditCard(@Param('document') document, @Body() model: CreditCard){
        try{
           const response = await this.customerService.saveOrUpdateCreditCard(document, model);
            return new Result(
                'Cartão adicionado com sucesso.',
                response,
                true,
                null,
            );
        }
        catch(error){
            throw new HttpException(new Result(
                'Não foi possível adicionar o cartão de crédito. Confira seus dados.',
                false,
                null,
                error),
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
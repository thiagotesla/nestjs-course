import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "src/interceptors/valitador.interceptor";
import { CreateAddressContract } from "../contracts/customers/create-address.contract";
import { CreateCustomerContract } from "../contracts/customers/create-customer.contract";
import { CreatePetContract } from "../contracts/customers/create-pet.contract";
import { CreateCustomerDto } from "../dtos/create-customer.dto";
import { QueryDto } from "../dtos/query.dto";
import { Address } from "../models/address.model";
import { Customer } from "../models/customer.model";
import { Pet } from "../models/pets.model";
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
    async query(@Body() model: QueryDto){
        const customers = await this.customerService.query(model)
        return new Result('Query executada com sucesso!', customers, true, null)
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto){
        try{
        const user = await this.accountService.create(new User(model.document, model.password, true));
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

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract))
    async AddBilillingAddress(@Param('document') document, @Body() model: Address){
        try{
            const response = await this.customerService.AddBillingAddress(document, model);
            return new Result(
                'Endereço de cobrança adicionado co sucesso.',
                response,
                true,
                null,
            );
        }
        catch(error){
            throw new HttpException(new Result(
                'Não foi possível adicionar endereço cobrança. Confira seus dados.',
                false,
                null,
                error),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract))
    async AddShippingAddress(@Param('document') document, @Body() model: Address){
        try{
           const response = await this.customerService.AddShippingAddress(document, model);
            return new Result(
                'Endereço de entrega adicionado com sucesso.',
                response,
                true,
                null,
            );
        }
        catch(error){
            throw new HttpException(new Result(
                'Não foi possível adicionar endereço de entrega. Confira seus dados.',
                false,
                null,
                error),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Post(':document/pet')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract))
    async createPet(@Param('document') document, @Body() model: Pet){
        try{
            const response = await this.customerService.AddNewPet(document, model);
            return new Result(
                'Pet adicionado com sucesso.',
                response,
                true,
                null,
            );
        }
        catch(error){
            throw new HttpException(new Result(
                'Não foi possível adicionar um novo pet. Confira seus dados.',
                null,
                false,
                error),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Put(':document/pet/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract))
    async updatePet(@Param('document') document, @Param('id') id, @Body() model: Pet){
        try{
            const response = await this.customerService.updatePet(document, id, model);
            return new Result(
                'Pet alterado com sucesso',
                response,
                true,
                null,
            );
        }
        catch(error){
            throw new HttpException(new Result(
                'Não foi possível atualizar o pet. Confira seus dados.',
                null,
                false,
                error),
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
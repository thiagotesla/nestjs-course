import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseInterceptors } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { ValidatorInterceptor } from "src/interceptors/valitador.interceptor";
import { CreateAddressContract } from "../contracts/address/create-address.contract";
import { AddressType } from "../enums/address-type.enum";
import { Address } from "../models/address.model";
import { Result } from "../models/result.model";
import { AddressService } from "../services/address.service";

@Controller('v1/addresses')
export class AddressController{
    constructor(
        private readonly addressService: AddressService,
        ){
    }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract))
    async AddBilillingAddress(@Param('document') document, @Body() model: Address){
        try{
            const response = await this.addressService.create(document, model, AddressType.Billing);
            return new Result(
                'Endereço de cobrança adicionado com sucesso.',
                response,
                true,
                null,
            );
        }
        catch(error){
            throw new HttpException(new Result(
                'Não foi possível adicionar o endereço cobrança. Confira seus dados.',
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
           const response = await this.addressService.create(document, model, AddressType.Shipping);
            return new Result(
                'Endereço de entrega adicionado com sucesso.',
                response,
                true,
                null,
            );
        }
        catch(error){
            throw new HttpException(new Result(
                'Não foi possível adicionar o endereço de entrega. Confira seus dados.',
                false,
                null,
                error),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Get('search/:zipcode')
    async search(@Param('zipcode') zipcode: any){
        
        try{
            //const response = await this.addressService.getAddressByZipCode(zipcode).toPromise();
            const response = await firstValueFrom(this.addressService.getAddressByZipCode(zipcode));  
            return new Result(
                null,
                response.data,
                true,
                null
            );
        }
        catch (error) {
            throw new HttpException(new Result(
                'Não foi possível localizar seu endereço',
                null,
                false,
                error),
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
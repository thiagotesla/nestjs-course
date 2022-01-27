import { Injectable } from "@nestjs/common";
import { Flunt } from "src/utils/flunt";
import { UpdateCustomerDto } from "../../dtos/customer/update-customer.dto";
import { Contract } from "../contract";


@Injectable()
export class UpdateCustomerContract implements Contract{
    errors: any[];

    validate(model: UpdateCustomerDto): any {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 2, "Nome inválido.");
        this.errors = flunt.errors;
        
        return flunt.isValid();
    }
}
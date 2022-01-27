import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "src/modules/backoffice/dtos/create-customer.dto";
import { Flunt } from "src/utils/flunt";
import { Contract } from "../contract";


@Injectable()
export class CreateCustomerContract implements Contract{
    errors: any[];

    validate(model: CreateCustomerDto): any {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 2, "Nome inválido.");
        flunt.isEmail(model.email, "Email inválido.");
        flunt.isFixedLen(model.document, 11, "O CPF deve ter 11 caracteres.");

        this.errors = flunt.errors;
        
        return flunt.isValid();
    }
}

import { Injectable } from "@nestjs/common";
import { Address } from "src/backoffice/models/address.model";
import { Flunt } from "src/utils/flunt";
import { Contract } from "../contract";

@Injectable()
export class CreateCustomerContract implements Contract{
    errors: any[];

    validate(model: Address): any {
        const flunt = new Flunt();

        flunt.isRequired(model.zipCode, 'O CEP é obrigatorio.');
        flunt.isFixedLen(model.zipCode, 8, 'O CEP deve ter 8 caracteres.');
        flunt.isRequired(model.street, 'O nome da rua é obrigatorio.');
        flunt.isRequired(model.houseNumber, 'O número da casa é obrigatorio.');
        flunt.isRequired(model.city, 'O nome da cidade é obrigatorio.');
        flunt.isRequired(model.country, 'O nome do país é obrigatorio.');

        this.errors = flunt.errors;
        
        return flunt.isValid();
    }
}
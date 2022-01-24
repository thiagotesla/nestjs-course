import { Flunt } from "src/utils/flunt";
import { Customer } from "../models/customer.model";
import { Contract } from "./contract";

export class CreateCustomerContract implements Contract{
    errors: any[];

    validate(model: Customer): any {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 2, "Nome inválido.");
        flunt.isEmail(model.email, "Email inválido.");
        flunt.isFixedLen(model.document, 11, "O CPF deve ter 11 caracteres.");
        flunt.hasMinLen(model.password, 6, "Senha inválida.");

        this.errors = flunt.errors;
        
        return flunt.isValid();
    }
}
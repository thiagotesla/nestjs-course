import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "src/modules/backoffice/dtos/customer/create-customer.dto";
import { Flunt } from "src/utils/flunt";
import { CreditCard } from "../../models/credit-card.model";
import { Contract } from "../contract";


@Injectable()
export class CreateCreditCardContract implements Contract{
    errors: any[];

    validate(model: CreditCard): any {
        const flunt = new Flunt();
        flunt.hasMinLen(model.holder, 2, 'Nome inválido!');
        flunt.isFixedLen(model.cardNumber, 16, "O número do cartão deve ter 16 caracteres.");
        flunt.isFixedLen(model.expiration, 4, 'Número de validade inválido!')

        this.errors = flunt.errors;
        
        return flunt.isValid();
    }
}
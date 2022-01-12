import { Adress } from "./adress.model";
import { CreditCard } from "./credit-card.model";
import { Pet } from "./pets.model";

export class Customer{
    constructor(
        public name: string,
        public document: string,
        public email: string,
        public password: string,
        public active: boolean,
        public pets: Pet[],
        public billingAdress: Adress[],
        public shippingAdress: Adress[],
        public creditcard: CreditCard[],
    ){
    }
}
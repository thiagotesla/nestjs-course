import { Address } from "./adress.model";
import { CreditCard } from "./credit-card.model";
import { Pet } from "./pets.model";
import { User } from "./user.model";

export class Customer{
    constructor(
        public name: string,
        public email: string,
        public document: string,
        public pets: Pet[],
        public billingAdress: Address[],
        public shippingAdress: Address[],
        public creditcard: CreditCard[],
        public user: User,
    ){
    }
}

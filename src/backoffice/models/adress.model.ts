export class Address{
    constructor(
        public zipCode: string,
        public street: string,
        public houseNumber: string,
        public complement: string,
        public neighborhood: string,
        public city: string,
        public country: string,
    ){
    }
}
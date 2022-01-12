import { Controller } from "@nestjs/common";

@Controller()
export class CustomerController{
    get() {
        return 'Método Get';
    }

    post(){
        return 'Método Post';
    }

    put() {
        return 'Método Put';
    }

    delete(){
        return 'Método Delete';
    }
}
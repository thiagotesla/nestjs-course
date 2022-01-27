import { Injectable } from "@nestjs/common";
import { Flunt } from "src/utils/flunt";
import { QueryDto } from "../../dtos/query.dto";
import { Contract } from "../contract";


@Injectable()
export class CreateQueryContract implements Contract{
    errors: any[];

    validate(model: QueryDto): any {
        const flunt = new Flunt();

        if(!model.query){
            model.query = {};
        }

        flunt.isGreaterThan(model.take, 1000, 'Campo Take tem tamanho máximo de 1000.');
    

        this.errors = flunt.errors;
        
        return flunt.isValid();
    }
}
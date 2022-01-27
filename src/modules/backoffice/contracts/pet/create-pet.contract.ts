import { Pet } from "src/modules/backoffice/models/pets.model";
import { Flunt } from "src/utils/flunt";
import { Contract } from "../contract";

export class CreatePetContract implements Contract{
    errors: any[];
    validate(model: Pet): any {
        
        const flunt = new Flunt();
        flunt.hasMinLen(model.name, 2, 'Nome inválido para um pet.');
        flunt.hasMinLen(model.gender, 3, 'Gênero inválido.');
        flunt.hasMinLen(model.kind, 3, 'Tipo inválido.'),
        flunt.hasMinLen(model.breed, 3, 'Raça inválida.');

        this.errors = flunt.errors;
        
        return flunt.isValid();
    }
}
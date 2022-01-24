import { Flunt } from "src/utils/flunt";
import { User } from "../models/user.model";
import { Contract } from "./contract";

export class CreateUserContract implements Contract{
    errors: any[];
    validate(model: User): any {
        const flunt = new Flunt();
        flunt.hasMinLen(model.username, 2, 'O nome de usuário deve ter pelo menos 2 caracteres.')
        flunt.hasMinLen(model.password, 6, "Senha inválida.");
    }

}

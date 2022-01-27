import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "src/interceptors/valitador.interceptor";
import { CreatePetContract } from "../contracts/pet/create-pet.contract";
import { Pet } from "../models/pets.model";
import { Result } from "../models/result.model";
import { CustomerService } from "../services/customer.service";
import { PetService } from "../services/pet.service";

@Controller('v1/pets')
export class PetController{
    constructor(
        private readonly petService: PetService,
        ){
    }


    @Post(':document')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract))
    async createPet(@Param('document') document, @Body() model: Pet){
        try{
            const response = await this.petService.create(document, model);
            return new Result(
                'Pet adicionado com sucesso.',
                response,
                true,
                null,
            );
        }
        catch(error){
            throw new HttpException(new Result(
                'Não foi possível adicionar um novo pet. Confira seus dados.',
                null,
                false,
                error),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Put(':document/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract))
    async updatePet(@Param('document') document, @Param('id') id, @Body() model: Pet){
        try{
            const response = await this.petService.update(document, id, model);
            return new Result(
                'Pet alterado com sucesso',
                response,
                true,
                null,
            );
        }
        catch(error){
            throw new HttpException(new Result(
                'Não foi possível atualizar o pet. Confira seus dados.',
                null,
                false,
                error),
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
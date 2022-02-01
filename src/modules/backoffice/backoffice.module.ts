import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { AddressController } from "./controllers/address.controller";
import { CustomerController } from "./controllers/customer.controller";
import { PetController } from "./controllers/pet.controller";
import { CustomerSchema } from "./schemas/customer.schema";
import { UserSchema } from "./schemas/user.schema";
import { AccountService } from "./services/account.service";
import { AddressService } from "./services/address.service";
import { CustomerService } from "./services/customer.service";
import { PetService } from "./services/pet.service";
import { AccountController } from "./controllers/account.controller";
import { AuthService } from "src/shared/services/auth.service";
import { JwtStrategy } from "src/shared/strategies/jwt-stretagy";
import 'dotenv/config'

@Module({
    imports:[
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
        secret: process.env.SECRET_KEY,
        signOptions: {
            expiresIn: 3600,
        },
    }),
        MongooseModule.forFeature([
            {
                name: 'Customer',
                schema: CustomerSchema,
            },
            {
                name: 'User',
                schema: UserSchema,
            },
        ])
    ],
    controllers: [
        CustomerController,
        AddressController,
        PetController,
        AccountController
    ],
    providers:[
        AccountService,
        CustomerService,
        AddressService,
        PetService,
        AuthService,
        JwtStrategy,
    ],
})
export class BackofficeModule{}

import { Module } from "@nestjs/common";
import { MongooseModule, Schema } from "@nestjs/mongoose";
import { CustomerController } from "./controllers/customer.controller";
import { CustomerSchema } from "./schemas/customer.schema";
import { UserSchema } from "./schemas/user.schema";
import { AccountService } from "./services/account.service";

@Module({
    imports:[
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
    controllers: [CustomerController],
    providers:[AccountService],
})
export class BackofficeModule{}
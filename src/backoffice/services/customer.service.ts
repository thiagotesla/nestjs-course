import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Address } from "../models/address.model";
import { Customer } from "../models/customer.model";

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>){

    }
    async create(data: Customer): Promise<Customer>{
        const customer = new this.model(data);
        return await customer.save();
    }

    async AddBillingAddress(document: string, data: Address): Promise<Customer>{
        const options = {upsert: true};
        return await this.model.findOneAndUpdate({document}, { 
            $set: {
                billingAddress: data,
            }
        }, options) 
    }

    async AddShippingAddress(document: string, data: Address): Promise<Customer>{
        const options = {upsert: true};
        return await this.model.findOneAndUpdate({document}, { 
            $set: {
                shippingAddress: data,
            }
        }, options) 
    }

}
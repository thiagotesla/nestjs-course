import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { QueryDto } from "../dtos/query.dto";
import { Address } from "../models/address.model";
import { Customer } from "../models/customer.model";
import { Pet } from "../models/pets.model";

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>){
    
    }

    async findAll(): Promise<Customer[]>{
        return await this.model.find({}, 'name email document').sort('name').exec();
    }

    async findOne(document): Promise<Customer>{
        return this.model.findOne({document}).populate('user', 'username').exec();
    }

    async query(model: QueryDto): Promise<Customer[]>{
        return await this.model
        .find(model.query,
            model.fields,
                {
                    skip: model.skip,
                    limit: model.take,
                })
            .sort(model.sort)
            .exec();
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

    async AddNewPet(document: string, data: Pet): Promise<Customer>{
        const options = {upsert: true, new: true};
        return await this.model.findOneAndUpdate({document}, { 
            $push: {
                pets: data,
            }
        }, options) 
    }

    async updatePet(document: string, id: string, data: Pet): Promise<Customer>{
        const options = {upsert: true};
        return await this.model.findOneAndUpdate({document, 'pets._id': id
        },{ $set: {
            'pets.$': data,
            }
        })
    }
}

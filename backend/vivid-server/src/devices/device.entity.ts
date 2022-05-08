import {Field, Int, ObjectType } from "@nestjs/graphql";
import{Column,Entity, PrimaryGeneratedColumn} from "typeorm"; 

@Entity()
@ObjectType()
export class Device {
    @PrimaryGeneratedColumn()
    @Field()
    Serial_Number: string;

    @Column()
    @Field(type => Date)
    DateTime: Date;

    @Column({nullable:true})
    @Field({nullable:true})
    Device_ID?: string;

    @Column({nullable:true})
    @Field({nullable:true})
    Device_Name?: string;

    @Column({nullable:true})
    @Field({nullable:true})
    User_Device_Name?: string;

    @Column({nullable:true})
    @Field({nullable:true})
    Device_Type?: string;

    @Column({nullable:true})
    @Field({nullable:true})
    Device_Make?: string;

    @Column({nullable:true})
    @Field({nullable:true})
    Device_Model?: string;

    @Column({nullable:true})
    @Field({nullable:true})
    Device_Location?: string;

    @Column({nullable:true})
    @Field(type => Int,{nullable:true})
    Wattage?: number;

}
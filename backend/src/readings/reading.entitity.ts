import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';
import {Field, Int, Float, ObjectType } from "@nestjs/graphql";
@Entity({name: "readings",synchronize: false})
export class Reading {
  @PrimaryColumn()
  @Field()
  Serial_Number: string;

  @PrimaryColumn()
  @Column()
  @Field(type => Date)
  DateTime: Date;

  @Column()
  @Field()
  Device_ID: string;

  @Column({nullable:true})
  @Field({nullable:true})
  Device_Name?: string;

  @Column({nullable:true})
  @Field({nullable:true})
  User_Device_Name?: string;

  @Column()
  @Field()
  Device_Type: string;

  @Column({nullable:true})
  @Field({nullable:true})
  Device_Make?: string;

  @Column({nullable:true})
  @Field({nullable:true})
  Device_Model?: string;

  @Column({nullable:true})
  @Field({nullable:true})
  Device_Location?: string;

  @Column()
  @Field(type => Float)
  Wattage: number;
}
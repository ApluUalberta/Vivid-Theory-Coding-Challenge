import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Device} from './device.entity';
@Injectable()
export class DevicesService {
    constructor(@InjectRepository(Device) private devicesRepository: Repository<Device>){}
    async findAll(): Promise<Device[]> {
        return this.devicesRepository.find(); // SELECT * devices
    }

    // filter by Serial Number
    
    // filter by Device ID

}

import { Resolver, Query } from '@nestjs/graphql';
import { Device } from './device.entity';
import { DevicesService } from './devices.service';

@Resolver(of => Device)
export class DevicesResolver {
    constructor(private devicesService: DevicesService){}
    
    @Query(returns => [Device])
    devices(): Promise<Device[]>{
        return this.devicesService.findAll();
    }


}

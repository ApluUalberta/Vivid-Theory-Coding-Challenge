import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesResolver } from './devices.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Device} from './device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  providers: [DevicesService, DevicesResolver]
})
export class DevicesModule {}

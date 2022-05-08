import { Module } from '@nestjs/common';
import { join } from 'path';
import {GraphQLModule} from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesModule } from './devices/devices.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,autoSchemaFile: join(process.cwd(),'src/schema.gql')}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "smarthomes.postgres.database.azure.com",
      port: 5432,
      username: "smarthomesdashboarduser@smarthomes",
      password: "b5zT;q_fS\\aAUtpD",
      database: "wattage",
      ssl: true,
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    }),
    DevicesModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

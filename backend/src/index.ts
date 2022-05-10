import { DataSource} from 'typeorm';
import { EntityRepository, Repository } from "typeorm";

import { Reading } from './readings/reading.entitity';
import { ReadingRepository } from './readings/reading-repository';
import { createServer } from '@graphql-yoga/node';


(async () => { 
    
    let dataSource = new DataSource({
        type: "postgres",
        host: "smarthomes.postgres.database.azure.com",
        port: 5432,
        username: "smarthomesdashboarduser@smarthomes",
        password: "b5zT;q_fS\\aAUtpD",
        database: "wattage",
        ssl: true,
        synchronize: true,
        logging: true,
        entities: ['src/readings/reading.entitity.ts'],
    });
    let connection = await dataSource.initialize();
    const users = dataSource.manager.find(Reading);
    // Provide your schema
    const server = createServer({
        schema: {
        typeDefs: `
            type Reading {
                Serial_Number: String!
                DateTime: Date
                Device_ID: String!
                Device_Name: String
                User_Device_Name: String
                Device_Type: String!
                Device_Make: String
                Device_Model: String
                Device_Location: String
                Wattage: Float!
    
            }

            scalar Date

            type MyType {
                created: Date
            }
            type Query {
                hello(Serial_Number: String): String!
                reading(Serial_Number: String): [Reading]
            }
        `,
        resolvers: {
            Query: {
                hello: (_, { name }) => `Hello ${name || 'World'}`,
                // this is the user resolver
                reading: (_, { Serial_Number }) => {
                return connection.manager.createQueryBuilder()
                .select("readings")
                .from(Reading, "readings")
                .where("readings.Serial_Number = :Serial_Number", { Serial_Number})
                .getMany()
                },
            },
        },
        },
    })

    server.start()
})();

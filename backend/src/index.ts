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
                serialnumbergroups(LIMIT: Int): [Reading]
                deviceid(Serial_Number: String, Device_ID: String): [Reading]
                deviceidgroups(Serial_Number: String): [Reading]
                averagewattage(Serial_Number: String): [Reading]
            }
        `,
        resolvers: {
            Query: {
                hello: (_, { name }) => `Hello ${name || 'World'}`,
                // Aggregated readings


                reading: (_, { Serial_Number }) => {
                    return connection.manager.query(`SELECT *
                    from public.readings
                    WHERE "Serial_Number" = $1
                    LIMIT 100`, [Serial_Number])
                },

                // Grab all serial numbers -> Limit is unused but doesnt work without the argument for some reason.
                serialnumbergroups: (_, { LIMIT }) => {
                    return connection.manager.query(`SELECT "Serial_Number"
                    from public.readings
                    GROUP BY "Serial_Number"`, [])
                },

                // Filter by Serial Number and Device ID
                deviceid: (_, { Serial_Number, Device_ID }) => {
                    return connection.manager.query(`SELECT *
                    from public.readings
                    WHERE "Serial_Number" = $1  and "Device_ID" = $2
                    LIMIT 100`, [Serial_Number, Device_ID])
                },
                // Mainly for the filtering function
                deviceidgroups: (_,{Serial_Number}) => {
                    return connection.manager.query(`SELECT "Device_ID"
                    from public.readings
                    WHERE "Serial_Number" = $1 
                    GROUP BY "Device_ID"`, [Serial_Number])
                },
                averagewattage:  async (_,{Serial_Number}) => {
                    const result = await connection.manager.query(`SELECT "Serial_Number","Device_ID", AVG("Wattage") as average_wattage
                    FROM public.readings
                    WHERE "Serial_Number" = $1
                    GROUP BY "Serial_Number","Device_ID"`, [Serial_Number]);
                    return result;
                },
            },
        },
        },
    })

    server.start()
})();

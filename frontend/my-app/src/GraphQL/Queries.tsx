import {gql} from '@apollo/client';

export const LOAD_DEVICES = gql`
    query {
        devices {
            Serial_Number
            DateTime
            Device_ID
            Wattage
        }
    }
`
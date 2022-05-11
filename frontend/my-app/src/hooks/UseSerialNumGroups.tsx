
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default async function UseSerialNumGroups(){

    const SERIAL_NUMBERS = `
    {
        serialnumbergroups(LIMIT: 10){
            Serial_Number
        }
    }
    `
    const queryResult = await axios.post(
        "http://127.0.0.1:4000/graphql",{
            query: SERIAL_NUMBERS
        }
    );

    const serialNumberList = queryResult.data.data.serialnumbergroups;

    return serialNumberList;
  }
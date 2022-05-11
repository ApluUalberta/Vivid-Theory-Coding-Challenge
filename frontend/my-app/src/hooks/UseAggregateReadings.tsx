

import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default async function UseAggregateReadings(Serial_Number:String) {

    const AGGREGATE_READINGS = `
    {
    reading(Serial_Number: "${Serial_Number}"){
        Serial_Number
        DateTime
        Device_ID
        Wattage
    }
    }
    `

    const queryResult = await axios.post(
        "http://127.0.0.1:4000/graphql",{
            query: AGGREGATE_READINGS
        }
    );

    const AggregateReadings = queryResult.data.data.reading;
  
    return AggregateReadings;
  }
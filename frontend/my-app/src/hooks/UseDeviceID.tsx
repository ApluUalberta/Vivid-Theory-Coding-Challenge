import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default async function UseDeviceID(Serial_Number: String, Device_ID: String){
    const DEVICE_ID = `
    {
    deviceid(Serial_Number: ${Serial_Number}, Device_ID: ${Device_ID}){
        Serial_Number
        DateTime
        Device_ID
        Wattage
    }
    }
    `

    const queryResult = await axios.post(
        "http://127.0.0.1:4000/graphql",{
            query: DEVICE_ID
        }
    );

    const deviceIDList = queryResult.data.data.deviceid;
    console.log(deviceIDList);


    return deviceIDList;
  }
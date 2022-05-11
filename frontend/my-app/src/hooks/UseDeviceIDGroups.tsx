import React, {useState, useEffect} from 'react';
import axios from 'axios';
export default async function UseDeviceIDGroups(Serial_Number: String){
    const DEVICE_GROUP = `
    {
        deviceidgroups(Serial_Number: "${Serial_Number}"){
            Device_ID
        }
    }
    `

    const queryResult = await axios.post(
        "http://127.0.0.1:4000/graphql",{
            query: DEVICE_GROUP
        }
    );
    const deviceIDList = queryResult.data.data.deviceidgroups;
    return deviceIDList;
  }
  
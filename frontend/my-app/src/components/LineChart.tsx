import React, {useState, useEffect} from 'react';
import Chart from 'react-google-charts';
import { useQuery, gql} from "@apollo/client";
import { LOAD_DEVICES } from '../GraphQL/Queries';
import Dropdown from './../dropdown/Dropdown';

import UseAggregateReadings from '../hooks/UseAggregateReadings';
import UseSerialNumGroups from '../hooks/UseSerialNumGroups';
import UseDeviceIDGroups from '../hooks/UseDeviceIDGroups';
import UseDeviceID from '../hooks/UseDeviceID';

import FormatAggregateReadings from '../formatting/FormatAggregateReadings';
import FormatStandardAggregateReadings from '../formatting/FormatStandardAggregateReadings';
import FormatUseDeviceID from '../formatting/FormatUseDeviceID';
// Dropdown should be ALL, then others.
// Dropdown id should be ALL, then others.

const LineChartOptions = {
  hAxis: {
    title: 'Time',
  },
  vAxis: {
    title: 'Wattage',
  },
  series: {
    1: { curveType: 'function' },
  },
}

function LineChart(){
    /*
    Final Format of line data
    const LineData = [
        ['x', 'dogs', 'cats'],
        [0, 0, 0],
        [1, 10, 5],
        [2, 23, 15],
        [3, 17, 9],
        [4, 18, 10],
        [5, 9, 5],
        [6, 11, 3],
        [7, 27, 19],
      ]*/
    const [serialNumber,setSerial_Number] = useState("All");
    const [deviceID,setdeviceID] = useState("All");
    const [noReadingsForDeviceID, setNoReadingsForDeviceID] = useState(false);

    const [serialNumberGroups, setserialNumberGroups] = useState<String[]>([]);
    const [deviceIDList, setdeviceIDList] = useState<String[]>([]);
    const [LineData, setLineData] = useState<any[]>([]);
    useEffect(() => {
        // Set the default id list
        (async () => {
          const serialNumberGroupies = await UseSerialNumGroups();
          // turn list of json into list of
          const stringListSerialNumberGroupies: string[] = ["All"];
          for(var i = 0; i < serialNumberGroupies.length; i++) {
            var obj = serialNumberGroupies[i];
            stringListSerialNumberGroupies.push(obj.Serial_Number);
          }
          setserialNumberGroups(stringListSerialNumberGroupies);

        })();
    },[serialNumberGroups]);

    async function queryReadings(){
      // based on the serial and device id combinations, we query
      // Cases: All serial numbers (aggregate readings)
      // Specific serial number with any device id (readings)
      // Specific serial number with specific device id (deviceid)

      // Case 1
      if (serialNumber == "All"){
        // call readings in a loop over the serialnumbergroups starting at index 1
        const listOfReadings: any[] = [];
        for(var i = 1; i < serialNumberGroups.length; i++) {
          var obj = serialNumberGroups[i];
          // call readings
          listOfReadings.push(await UseAggregateReadings(obj));
        }
        setLineData( FormatAggregateReadings(serialNumberGroups, listOfReadings));
      }else if (serialNumber != "All" && deviceID == "All"){
        // call readings with the state variable
        const readings = await UseAggregateReadings(serialNumber);
        setLineData(FormatStandardAggregateReadings(serialNumber,readings));

      }else if (serialNumber != "All" && deviceID != "All"){
        // call UseDeviceID
        const readingsByIDandSerial = await UseDeviceID(serialNumber,deviceID);
        if (readingsByIDandSerial.length != 0){
          setLineData(FormatUseDeviceID(serialNumber,readingsByIDandSerial));
          setNoReadingsForDeviceID(false);
        }else{
          setNoReadingsForDeviceID(true);
        }

      }
    }


    async function changeSerialNumber(e: any) {
      setSerial_Number(e.target.value);
      // update the device id list
      getDeviceIDs();
      // call the function that gets the query we want
      queryReadings();
    }

    async function getDeviceIDs(){
      const deviceIDGroupies = await UseDeviceIDGroups(serialNumber);

      const stringListDeviceIDGroupies: string[] = ["All"];
      for(var i = 0; i < deviceIDGroupies.length; i++) {
        var obj = deviceIDGroupies[i];
        stringListDeviceIDGroupies.push(obj.Device_ID);
      }
      setdeviceIDList(stringListDeviceIDGroupies);
    }

    function changedeviceID(e: any) {
      setdeviceID(e.target.value);
      queryReadings();
    }


    return(
      <div>
          <div className="container mt-5">
              <h2>Smarthome usage</h2>
              <Chart
              width={'700px'}
              height={'410px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={LineData}
              options={LineChartOptions}
              rootProps={{ 'data-testid': '2' }}
              />
              <div>
                <h1>Serial Number</h1>
                <select value={serialNumber} onChange={changeSerialNumber}>
                  {serialNumberGroups.map((option) => {
                    return <option value={option.toString()} >{option}</option>;
                  })}
                </select>
              </div>

              { serialNumber != "All" &&
                <div>
                  <h1>Device ID</h1>
                  <select value={deviceID} onChange={changedeviceID}>
                    {deviceIDList.map((option) => {
                      return <option value={option.toString()} >{option}</option>;
                    })}
                  </select>
                </div>

              }
              {
                noReadingsForDeviceID ? 
                <div>
                  <h1> That device ID has no readings!</h1>
                </div>
                   : <div></div>
              }
        </div>
      </div>  
    );

}


export default LineChart;
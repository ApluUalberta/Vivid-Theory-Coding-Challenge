import React, {useState, useEffect} from 'react';
import Chart from 'react-google-charts';
import { useQuery, gql} from "@apollo/client";
import { LOAD_DEVICES } from '../GraphQL/Queries';
import Dropdown from './../dropdown/Dropdown';
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
    const [serialNumber,setSerial_Number] = useState("M708000111");
    const [deviceID,setdeviceID] = useState("");

    const [serialNumberGroups, setserialNumberGroups] = useState([]);
    const [deviceIDList, setdeviceIDList] = useState([]);
    const [LineData, setLineData] = useState([]);
    useEffect(() => {
        // Send a request to the backend endpoint to gather data
        // Get a list of possible device ID's

        // The first is to get the device names as these datapoints line up
        // The second is to get the data series for each and put them into the corresponding column
        // Once completed, the items should plot themselves accordingly
        // Do not plot if the data is null

        // Set the default id list
        setserialNumberGroups(serialNumGroups());
        console.log(serialNumberGroups);



    },[]);



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
        </div>
      </div>  
    );

}



export function aggregateReadings(Serial_Number:String) {

  useEffect(() => {
    // Send a request to the backend endpoint to gather data
    // The first is to get the device names as these datapoints line up
    // The second is to get the data series for each and put them into the corresponding column
    // Once completed, the items should plot themselves accordingly
    // Do not plot if the data is null
    const [aggregateReadings, setAggregateReadings] = useState([]);

    const AGGREGATE_READINGS = `
    {
      reading(Serial_Number: ${Serial_Number}){
        Serial_Number
        DateTime
        Device_ID
        Wattage
      }
    }
    `
    fetch('http://localhost:4000/graphql',{
      method: "GET",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({AGGREGATE_READINGS})
    }).then(response => response.json())
    .then(data => setAggregateReadings(data.data.reading));
  
  },[]);

  return aggregateReadings;
}

export function serialNumGroups(){
  const [serialNumberList, setserialNumberList] = useState([]);
  useEffect(() => {
    const SERIAL_NUMBERS = `
    {
      serialnumbergroups(LIMIT: 10){
        Serial_Number
      }
    }
    `

    fetch('http://localhost:4000/graphql',{
      method: "GET",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({SERIAL_NUMBERS})
    }).then(response => response.json())
    .then(data => setserialNumberList(data.data.serialnumbergroups));

  },[]);

  return serialNumberList;
}

export function deviceIDGroups(Serial_Number: String){
  const [deviceIDList, setdeviceIDList] = useState([]);
  useEffect(() => {
    const DEVICE_GROUP = `
    {
      deviceidgroups(Serial_Number: ${Serial_Number}){
        Device_ID
      }
    }
    `

    fetch('http://localhost:4000/graphql',{
      method: "GET",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({DEVICE_GROUP})
    }).then(response => response.json())
    .then(data => setdeviceIDList(data.data.deviceidgroups));

  },[]);

  return deviceIDList;
}

export function deviceID(Serial_Number: String, Device_ID: String){
  const [deviceIDList, setdeviceIDList] = useState([]);
  useEffect(() => {
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

    fetch('http://localhost:4000/graphql',{
      method: "GET",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({DEVICE_ID})
    }).then(response => response.json())
    .then(data => setdeviceIDList(data.data.deviceid));

  },[]);

  return deviceIDList;
}

export default LineChart;
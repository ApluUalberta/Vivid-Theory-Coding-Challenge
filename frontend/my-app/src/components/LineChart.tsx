import React, {useState, useEffect} from 'react';
import Chart from 'react-google-charts';
import { useQuery, gql} from "@apollo/client";
import { LOAD_DEVICES } from '../GraphQL/Queries';
import Dropdown from './../dropdown/Dropdown';

import UseAggregateReadings from '../hooks/UseAggregateReadings';
import UseSerialNumGroups from '../hooks/UseSerialNumGroups';
import UseDeviceIDGroups from '../hooks/UseDeviceIDGroups';
import UseDeviceID from '../hooks/UseDeviceID';
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
        (async () => {
          const serialNumberGroupies = await UseSerialNumGroups();
          // turn list of json into list of
          setserialNumberGroups(serialNumberGroupies);
        })();
    },[serialNumberGroups]);



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


export default LineChart;
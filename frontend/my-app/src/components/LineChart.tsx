import React, {useState, useEffect} from 'react';
import Chart from 'react-google-charts';
import { useQuery, gql} from "@apollo/client";
import { LOAD_DEVICES } from '../GraphQL/Queries';

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
    const [LineData, setLineData] = useState([]);
    const {error, loading, data} = useQuery(LOAD_DEVICES);
    useEffect(() => {
        // Send a request to the backend endpoint to gather data
        // The first is to get the device names as these datapoints line up
        // The second is to get the data series for each and put them into the corresponding column
        // Once completed, the items should plot themselves accordingly
        // Do not plot if the data is null
        console.log(data);
    },[data]);

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
    </div>);

}

export default LineChart;
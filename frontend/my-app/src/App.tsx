import React from "react";
import LineChart from './components/LineChart';
import {onError} from '@apollo/client/link/error';


export default function App() {

  return (
    <div className="App">
      <LineChart/>
    </div>
  );
}

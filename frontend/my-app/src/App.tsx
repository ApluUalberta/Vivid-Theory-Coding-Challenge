import React from "react";
import LineChart from './components/LineChart';
import {onError} from '@apollo/client/link/error';
import Dropdown from './dropdown/Dropdown';

export default function App() {

  return (
    <div className="App">
      <LineChart/>
    </div>
  );
}

export default function FormatStandardAggregateReadings(serialNumber:String, readings: any[]){        // format the readings and append to line data
    const aggregatedFormattedData: any[] = [];
    const formattedData: any[] = ["x",serialNumber];
    // Loop over the labels
    // Push the labels
    aggregatedFormattedData.push(formattedData);
    
    // iterate over the list of readings columnwise.
    for (var i = 0; i < 100; i++){
      // create a list
      const nestedList: any[] = [i];
      nestedList.push(readings[i].Wattage);
      // Push to big list
      aggregatedFormattedData.push(nestedList);
    }
    return aggregatedFormattedData;
}
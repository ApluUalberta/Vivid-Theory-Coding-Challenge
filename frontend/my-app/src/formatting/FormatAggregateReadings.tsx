export default function FormatAggregateReadings(serialNumberGroups:String[], listOfReadings: any[]){        // format the readings and append to line data
    const aggregatedFormattedData: any[] = [];
    const formattedData: any[] = ["x"];
    // Loop over the labels
    for(var i = 1; i < serialNumberGroups.length; i++) {
      var obj = serialNumberGroups[i];
      formattedData.push(obj);
    }
    // Push the labels
    aggregatedFormattedData.push(formattedData);
    
    // iterate over the list of readings columnwise.
    for (var i = 0; i < 100; i++){
      // create a list
      const nestedList: any[] = [i];
      for (var j = 0; j < listOfReadings.length; j++){
        //A[j][i]
        nestedList.push(listOfReadings[j][i].Wattage);

      }
      // Push to big list
      aggregatedFormattedData.push(nestedList);
    }
    return aggregatedFormattedData;
}
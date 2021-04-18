// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  console.log("buildTable data size = " + data.length)
  // console.log("buildTable data = " + JSON.stringify(data))
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
let filters = {} 

// 3. Use this function to update the filters. 
function updateFilters() {
    console.log('updateFilters')
    filters = {}
    // 4a. Save the element that was changed as a variable.
    // 4b. Save the value that was changed as a variable.
    // 4c. Save the id of the filter that was changed as a variable.
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    let datetime = document.getElementById('datetime').value
    if (datetime) { filters['datetime'] = datetime }
    let city = document.getElementById('city').value
    if (city) { filters['city'] = city }
    let state = document.getElementById('state').value
    if (state) { filters['state'] = state }
    let country = document.getElementById('country').value
    if (country) { filters['country'] = country }
    let shape = document.getElementById('shape').value
    if (shape) { filters['shape'] = shape }
    
    // 6. Call function to apply all filters and rebuild the table
    console.log("filters = " + JSON.stringify(filters));
    filterTable();
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
    console.log('filterTable')
    // 8. Set the filtered data to the tableData.
    filteredData = tableData
    
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    if (filters.datetime) {
      filteredData = filteredData.filter(data => filters.datetime === data.datetime)
    }
    if (filters.city) {
      filteredData = filteredData.filter(data => filters.city === data.city)
    }
    if (filters.state) {
      filteredData = filteredData.filter(data => filters.state === data.state)
    }
    if (filters.country) {
      filteredData = filteredData.filter(data => filters.country === data.country)
    }
    if (filters.shape) {
      filteredData = filteredData.filter(data => filters.shape === data.shape)
    }
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  document.getElementById('datetime').addEventListener('input', updateFilters);
  document.getElementById('city').addEventListener('input', updateFilters);
  document.getElementById('state').addEventListener('input', updateFilters);
  document.getElementById('country').addEventListener('input', updateFilters);
  document.getElementById('shape').addEventListener('input', updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);

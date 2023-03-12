const weatherdata30="https://webapi19sa-1.course.tamk.cloud/v1/weather";



const weatherdatameasurement30 = fetch(weatherdata30)
  .then((res) => res.json())
  .then((data) => data.slice(0, 30))
  .then((output) => {
    const weatherPage30 = document.getElementById("latest30");
    output.map((data, index) => {
      const dataType = Object.keys(data.data)[0];
      const date = new Date(data.date_time);
      const row = weatherPage30.insertRow(index);
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);
      cell1.innerHTML = index + 1;
      cell2.innerHTML = date.toDateString();
      cell3.innerHTML = date.toLocaleTimeString();
      cell4.innerHTML = dataType;
      cell5.innerHTML = data.data[`${dataType}`];
    });
  });

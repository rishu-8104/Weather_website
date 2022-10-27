const weatherdata30="http://webapi19sa-1.course.tamk.cloud/v1/weather";

const direcHrAvgUri = "http://webapi19sa-1.course.tamk.cloud/v1/weather";


const specificweatherdata = (timeInterval) => {
    const canvasDiv = document.getElementById("canvas_div");
    canvasDiv.innerHTML = "";
    const newCanvas = document.createElement("canvas");
    newCanvas.setAttribute("id", "myChart");
    canvasDiv.appendChild(newCanvas);
  
  
  
    console.log(timeInterval);
    const currentSelection = document.getElementById("currentSelection");
    currentSelection.innerHTML = "";
    const newH1 = document.createElement("h1");
    currentSelection.appendChild(newH1);
    newH1.innerHTML =
      timeInterval === "1 week" || timeInterval === "now"
        ? timeInterval
        : `${timeInterval} hours`;
    const URI =
      timeInterval === "now"
        ? weatherdata30
        : "24"
        ? `${direcHrAvgUri}/rain/23`
        : "48"
        ? `${direcHrAvgUri}/rain/47`
        : "72"
        ? `${direcHrAvgUri}/rain/71`
        : `${direcHrAvgUri}/rain/167`;
  
  
  
    fetch(URI)
      .then((res) => res.json())
      .then((data) => data.slice(0, 25))
      .then((data) => {
        const top20WindSpeedTable = document.getElementById(
          "top_25_rain_data"
        );
  
        data.map((data, index) => {
          const date = new Date(data.date_time);
          const row = top20WindSpeedTable.insertRow(index);
  
          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1);
          const cell3 = row.insertCell(2);
          const cell4 = row.insertCell(3);
          cell1.innerHTML = index + 1;
          cell2.innerHTML = date.toDateString();
          cell3.innerHTML = date.toLocaleTimeString();
          cell4.innerHTML = data.data[`rain`];
        });
        const labels = data.map((entry) =>
          new Date(entry.date_time).toLocaleTimeString()
        );
  
        const informations = {
          labels: labels,
          datasets: [
            {
              label: "Wind Speed",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: data.map((info) => parseFloat(info.wind_speed)),
            },
          ],
        };
  
        const config = {
          type: "bar",
          data: informations,
          options: {},
        };
        const myChart = new Chart(document.getElementById("myChart"), config);
      });
  };
  
  window.onload = () => {
    specificweatherdata("now");
  };
  
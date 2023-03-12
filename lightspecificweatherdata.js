
const weatherdata30="https://webapi19sa-1.course.tamk.cloud/v1/weather";

const direcHrAvgUri = "https://webapi19sa-1.course.tamk.cloud/v1/weather";

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
        ? `${direcHrAvgUri}/light/23`
        : "48"
        ? `${direcHrAvgUri}/light/47`
        : "72"
        ? `${direcHrAvgUri}/light/71`
        : `${direcHrAvgUri}/light/167`;
  
  
  
    fetch(URI)
      .then((res) => res.json())
      .then((data) => data.slice(0, 25))
      .then((data) => {
        const top20WindSpeedTable = document.getElementById(
          "top_25_light_data"
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
          cell4.innerHTML = data.data[`light`];
        });
        const labels = data.map((entry) =>
          new Date(entry.date_time).toLocaleTimeString()
        );
  
        const informations = {
          labels: labels,
          datasets: [
            {
              label: "Light",
              backgroundColor: "red",
              borderColor: "black",
              data: data.map((info) => parseFloat(info.Light)),
            },
          ],
        };
  
        const config = {
          type: "line",
          data: informations,
          options: {},
        };
        const myChart = new Chart(document.getElementById("myChart"), config);
      });
  };
  
  window.onload = () => {
    specificweatherdata("now");
  };
  

const Temperature20 ="https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature";

const direcHrAvgUri = "https://webapi19sa-1.course.tamk.cloud/v1/weather";

const latest20Tempdata = (timeInterval) => {
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
      ? Temperature20
      : "24"
      ? `${direcHrAvgUri}/temperature/23`
      : "48"
      ? `${direcHrAvgUri}/temperature/47`
      : "72"
      ? `${direcHrAvgUri}/temperature/71`
      : `${direcHrAvgUri}/temperature/167`;

      fetch(URI)
      .then((res) => res.json())
      .then((data) => {
        const top20TempTable = document.getElementById("top_20_temp_data");
        data.map((data, index) => {
          const date = new Date(data.date_time);
          const row = top20TempTable.insertRow(index);
  
          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1);
          const cell3 = row.insertCell(2);
          const cell4 = row.insertCell(3);
          cell1.innerHTML = index + 1;
          cell2.innerHTML = date.toDateString();
          cell3.innerHTML = date.toLocaleTimeString();
          cell4.innerHTML = data.temperature;
        });
        const labels = data.map((entry) =>
        new Date(entry.date_time).toLocaleTimeString()
      );
      const informations = {
        labels: labels,
        datasets: [
          {
            label: "Temperature",
            backgroundColor: "red",
            borderColor: "black",
            data: data.map((info) => parseFloat(info.temperature)),
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
  latest20Tempdata("now");
};

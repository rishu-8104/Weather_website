const latest20WindSpeed = "https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed";

const Avgdata = "https://webapi19sa-1.course.tamk.cloud/v1/weather";


const top20WindSpeedreadings = (timeInterval) => {
    const canvasDiv = document.getElementById("canvas_div");
    canvasDiv.innerHTML = "";
    const newCanvas = document.createElement("canvas");
    newCanvas.setAttribute("id", "myChart");
    canvasDiv.appendChild(newCanvas);

  
    
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
        ? latest20WindSpeed
        : "24"
        ? `${Avgdata}/wind_speed/23`
        : "48"
        ? `${Avgdata}/wind_speed/47`
        : "72"
        ? `${Avgdata}/wind_speed/71`
        : `${Avgdata}/wind_speed/167`;

    fetch(URI)
      .then((res) => res.json())
      .then((data) => {
        const top20WindSpeedTable = document.getElementById(
          "top_20_wind_speed_data"
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
          cell4.innerHTML = data.wind_speed;
        });
        const labels = data.map((entry) =>
          new Date(entry.date_time).toLocaleTimeString()
        );
  
        const informations = {
          labels: labels,
          datasets: [
            {
              label: "Wind Speed",
              backgroundColor: "Red",
              borderColor: "black",
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
    top20WindSpeedreadings("now");
  };
  

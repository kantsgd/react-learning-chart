import React from "react";
import { Bar } from "react-chartjs-2";
import "./App.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

let chartData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Number of Smart Phone Sales",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: chartData, monthsFirst: 0, monthsSecond: 4 };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let selectName = event.target.name;
    let selectedValue = parseInt(event.target.value);

    let updatedData = {...chartData};

    if ((selectName === "months" && this.state.monthsSecond >= selectedValue)) {
      updatedData.labels = updatedData.labels.slice(selectedValue, this.state.monthsSecond+1);
      updatedData.datasets[0].data.slice(selectedValue, this.state.monthsSecond + 1);

      this.setState({data: updatedData, monthsFirst: selectedValue});
    }
    else if ((selectName === "months2" && this.state.monthsFirst <= selectedValue) ) {
      updatedData.labels = updatedData.labels.slice(this.state.monthsFirst, selectedValue+1);
      updatedData.datasets[0].data.slice(this.state.monthsFirst, selectedValue+1);

      this.setState({data: updatedData, monthsSecond: selectedValue});
    }
  }

  render() {
    return (
      <div>
        <div id="wide" />
        <div id="narrow">
          <Bar
            data={this.state.data}
            options={{
              title: {
                display: true,
                text: "Smart phone sale per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
          <label>Select Month interval </label>
          <select name="months" onChange={this.handleChange}>
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
          </select>
          <select name="months2" onChange={this.handleChange}>
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
          </select>
        </div>
      </div>
    );
  }
}

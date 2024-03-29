// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import ReactDOM from "react-dom";
import cars from "./practice";

const [honda, tesla] = cars
const {coloursByPopularity: [ hondaTopColour ], speedStats: { topSpeed : hondaTopSpeed }} = honda
const {coloursByPopularity: [ teslaTopColour ], speedStats: { topSpeed : teslaTopSpeed }} = tesla

// const [hondaTopSpeed, hondaTopColour] = [honda.speedStats.topSpeed, honda.coloursByPopularity[0]]
// const [teslaTopSpeed, teslaTopColour] = [tesla.speedStats.topSpeed, tesla.coloursByPopularity[0]]

ReactDOM.render(
  <table>
    <thead>
        <tr>
            <th>Brand</th>
            <th>Top Speed</th>
            <th>Top Color</th>
        </tr>
    </thead>
    
    <tbody>
        <tr>
            <td>{tesla.model}</td>
            <td>{teslaTopSpeed}</td>
            <td>{teslaTopColour}</td>
        </tr>
        <tr>
            <td>{honda.model}</td>
            <td>{hondaTopSpeed}</td>
            <td>{hondaTopColour}</td>
        </tr>
    </tbody>
    
  </table>,
  document.getElementById("root")
);

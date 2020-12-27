import React from "react";
import Card from '@material-ui/core/Card';


export default function Legend(props) {
  const renderLegendKeys = (stop, i) => {
    return (
      <div
        key={i}
        style={{
          fontSize: "12px",
          margin:"5px"
        }}>
        <div
          style={{
            float: "left",
            width: "10px",
            height: "10px",
            backgroundColor: stop[1],
            display: "inline-block",
            margin: 3,
          }} />
        {`${stop[0].toLocaleString()}`}

      </div>

    );
  };
  const installColors = [
    [3000, '#d5ffd5'],
    [6000, '#aaffaa'],
    [9000, '#80ff80'],
    [12000, '#55ff55'],
    [15000, '#2bff2b'],
  ];
  const outputColors = [
    [15000, '#d5d5ff'],
    [30000, '#aaaaff'],
    [45000, '#8080ff'],
    [60000, '#5555ff'],
    [75000, '#2b2bff'],
  ];

  const cardStyle = {
    zIndex: 4,
    padding: 10,
    right: "10px",
    bottom: "40px",
    position: 'absolute',
    borderRadius: "10px",
  }
  return (
    <>
      <Card style={cardStyle}>
        <div style={{ fontSize: 15 }}>{props.isInstall ? "Installations" : "Output (kW)"}</div>
        {props.isInstall ? installColors.map(renderLegendKeys) : outputColors.map(renderLegendKeys)}
      </Card>
    </>
  )
}

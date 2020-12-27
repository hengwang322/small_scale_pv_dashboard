import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import Card from '@material-ui/core/Card';

export default function Chart(props) {
  const sliceTooltip = ({ slice }) => (
    <Card style={{ padding: 10 }}>
      <div style={{ fontSize: 15 }}>
        {slice.points[0].data.x.toISOString().slice(0, 7)}
      </div>
      <div style={{ fontSize: 15, color: "grey" }}>
        {props.isInstall ? 'Install: ' : 'Output: '}{slice.points[0].data.y}
      </div>
    </Card>
  )

  return (
    <ResponsiveLine
      data={props.data}
      margin={{
        top: 10,
        right: 80,
        bottom: 60,
        left: 80
      }}
      yScale={{
        type: "linear",
        stacked: false
      }}
      xScale={{
        type: "time",
        precision: "month",
        format: 'native'
      }}
      axisLeft={{
        legend: props.isInstall ? 'Install No.' : 'Output (kW)',
        legendOffset: -60,
        legendPosition: 'middle',
        format: v => `${v / 1000}k`
      }}
      axisBottom={{
        format: "%Y-%m",
        legend: "Time",
        legendPosition: 'middle',
        legendOffset: 25
      }}
      yFormat=" >-.1e"
      useMesh={true}
      animate
      enablePoints={false}
      colors={{ datum: 'color' }}
      isInteractive={true}
      enableSlices="x"
      lineWidth={2}
      sliceTooltip={sliceTooltip}
    />
  );
};
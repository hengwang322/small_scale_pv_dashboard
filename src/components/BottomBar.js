import React from 'react';
import data from '../data/data_by_post.json';
import months from '../data/months.json';
import Card from '@material-ui/core/Card';
import Chart from './Chart';

function transformData(input, isInstall) {
  var output = [{
    "id": isInstall ? 'Install' : 'Output',
    "color": isInstall ? '#52af77' : '#3232CD',
    "data": []
  }];
  var data_ = [];
  if (!input) { return output }
  months.forEach((month, index) => {
    data_.push({ "x": new Date(month), "y": input[index] })
  })
  output[0]["data"] = data_;
  return output;
};

export default function BottomBar(props) {
  const postcode = props.postcode || 'all';
  const category = props.isInstall ? 'install' : 'output';
  const cardStyle = {
    minWidth: "70%",
    maxWidth: "90%",
    zIndex: 2,
    position: 'absolute',
    bottom: "0px",
    borderRadius: "10px 10px 0px 0px",
    height: 200,
    padding: "20px",
  };
  return (
    <Card style={cardStyle}>
      <div style={{ margin: 5, display: "inline-block" }}>
        {`Small-scale PV ${category} in ${postcode === 'all' ? 'Australia ' : postcode}`}
      </div>
      <Chart
        data={transformData(data[category][postcode], props.isInstall)}
        isInstall={props.isInstall}
      />
    </Card>
  );
};
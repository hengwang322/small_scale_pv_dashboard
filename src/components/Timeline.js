import React from 'react';
import Slider from '@material-ui/core/Slider';
import months from '../data/months.json';

export default function Timeline(props) {

  return (
    <Slider
      style={{
        color: props.isInstall ? '#52af77' : '#3232CD',
        height: 20,
        width: "60%",
        position: 'absolute',
        bottom: "220px",
        zIndex: 5,
      }}
      min={0}
      max={235}
      valueLabelDisplay="auto"
      valueLabelFormat={i => months[i]}
      value={props.value}
      onChange={(_e, value) => { props.onChange(value) }}
    />
  )
}

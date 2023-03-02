import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    color: "#000",
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({ min, max, value, setValue }) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className={classes.root}>
      <IOSSlider
        
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        marks={[
          {
            value: min,
            label: min,
          },
          {
            value: max,
            label: max,
          },
        ]}
        getAriaValueText={valuetext}
      />
    </div>
  );
}

const IOSSlider = withStyles({
  root: {
    color: "#000",
    height: 2,

    padding: "15px 0",
  },
  thumb: {
    height: 25,
    width: 25,
    backgroundColor: "#fff",

    border: "2px solid black",
    marginTop: -12.5,
    marginLeft: -12.5,
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 12px)",
    top: -18,
    "& *": {
      background: "transparent",
      color: "black",
      fontWeight: 500
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: "#000",
  },
  mark: {
    backgroundColor: "transparent",
    height: 30,
    width: 70,
    marginTop: -10,
  },
  markActive: {
    opacity: 1,
    backgroundColor: "transparent",
  },
})(Slider);

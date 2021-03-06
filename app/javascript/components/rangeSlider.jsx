import * as React from "react";
import { Range } from "react-range";
export const Direction = {
  Right: "to right",
  Left: "to left",
  Down: "to bottom",
  Up: "to top"
};
export function getTrackBackground({
  values,
  colors,
  min,
  max,
  direction = Direction.Right,
  rtl = false
}) {
  if (rtl && direction === Direction.Right) {
    direction = Direction.Left;
  } else if (rtl && Direction.Left) {
    direction = Direction.Right;
  }
  const progress = values.map(value => ((value - min) / (max - min)) * 100);
  const middle = progress.reduce(
    (acc, point, index) =>
      `${acc}, ${colors[index]} ${point}%, ${colors[index + 1]} ${point}%`,
    ""
  );
  return `linear-gradient(${direction}, ${colors[0]} 0%${middle}, ${
    colors[colors.length - 1]
  } 100%)`;
}

const STEP = 5000;
const MIN = 0;
const MAX = 500000;
export default class RangeSlider extends React.Component {
  state = {
    values: [parseInt(this.props.startPrice), parseInt(this.props.endPrice)]
  };
  currencyFormat = num => {
    const number = parseInt(num);
    return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.state.values[0] !== parseInt(nextProps.startPrice) ||
      this.state.values[1] !== parseInt(nextProps.endPrice)
    ) {
      this.setState({
        values: [parseInt(nextProps.startPrice), parseInt(nextProps.endPrice)]
      });
    }
  }

  //   static getDerivedStateFromProps(props, state) {
  //     if (
  //       state.values[0] !== parseInt(props.startPrice) ||
  //       state.values[1] !== parseInt(props.endPrice)
  //     ) {
  //       return { values: [parseInt(props.startPrice), parseInt(props.endPrice)] };
  //     }
  //     return null;
  //   }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "200px"
        }}
      >
        <Range
          values={this.state.values}
          step={this.props.step}
          min={MIN}
          max={this.props.maxPrice}
          onChange={values => {
            this.setState({ values });
          }}
          onFinalChange={values => {
            this.props.onRangeChange(values);
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%"
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: this.state.values,
                    colors: ["#ccc", "#ffc124", "#ccc"],
                    min: MIN,
                    max: this.props.maxPrice
                  }),
                  alignSelf: "center"
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "22px",
                width: "22px",
                borderRadius: "4px",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA"
              }}
            >
              <div
                style={{
                  height: "16px",
                  width: "5px",
                  backgroundColor: isDragged ? "#ffc124" : "#CCC"
                }}
              />
            </div>
          )}
        />
        <output
          style={{
            marginTop: "0px",
            color: "rgb(198, 198, 206)",
            position: "relative",
            bottom: "4px"
          }}
          id="output"
        >
          {this.currencyFormat(this.state.values[0])}
          {this.props.unit} - {this.currencyFormat(this.state.values[1])}
          {this.props.unit}
        </output>
      </div>
    );
  }
}

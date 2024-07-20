import React from 'react';
import { Component, CSSProperties } from 'react'
import "./ThreeSpinner.scss";

type Size = "small" | "medium" | "large";
type Mode = "light" | "dark";

interface ThreeSpinnerPropsType {
    color ?: Array<string>;
    size  ?: Size;
    mode  ?: Mode;
}

interface CustomCSSProperties extends CSSProperties{
    "--color1": string;
    "--color2": string;
    "--color3": string;
    "--mode"  : string;
    "--size1" : string;
    "--size2" : string;
    "--size3" : string;
}


export class ThreeSpinner extends Component<ThreeSpinnerPropsType> {
    static defaultProps = {
        color: ["#3498db", "#e74c3c", "#2ecc71"],
        size: "small",
        mode: "light",
    }
  render() {

    const {color = ThreeSpinner.defaultProps.color,
            size = ThreeSpinner.defaultProps.size,
            mode = ThreeSpinner.defaultProps.mode,
    } = this.props;

    const styleSheet : CustomCSSProperties  = {
         "--color1"  : color[0],
         "--color2"  : color[1],
         "--color3"  : color[2],
         "--mode" :  mode == "light" ? "light" : "dark",
         "--size3" : size == "small" ? "20px" : size == "medium" ? "30px" :  "40px",
         "--size2" : size == "small" ? "30px" : size == "medium" ? "40px" :  "50px",
         "--size1" : size == "small" ? "40px" : size == "medium" ? "50px" :  "60px",
    }

    return (
        <div id='DGR-loader' style={styleSheet}>
         <div id="DGR-inner-loader" style={styleSheet}>
            <div id="DGR-innermost-loader" style={styleSheet} ></div>
         </div>
       </div>
    )
  }
}

export default ThreeSpinner

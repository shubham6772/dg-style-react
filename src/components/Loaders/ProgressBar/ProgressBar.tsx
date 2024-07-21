import React from 'react';
import { Component, CSSProperties } from 'react';
import './ProgressBar.scss';
import "./ProgressBar.scss";

interface MyClassComponentProps {
  max?: number;
  value?: number;
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
}

interface MyClassComponentState {
  progress: number;
  maxWidth: number;
  color : string;
  borderRadius: number;
  backgroundColor: string;
}

interface CustomCSSProperties extends CSSProperties {
  '--value': string;
  '--max': string;
  '--backgroundColor': string;
  '--color': string;
  '--borderRadius': string;
}

export class ProgressBar extends Component<MyClassComponentProps, MyClassComponentState> {
  private max: number;
  private value: number;
  private color: string;
  private backgroundColor: string;
  private borderRadius: number;

  constructor(props: MyClassComponentProps) {
    super(props);
    this.max = (props.max && props.max <= 100 && props.max >= 0) ? props.max : 100;
    this.value = (props.value && props.value <= 100 && props.value >= 0) ? props.value : 100;
    this.color = props.color ?? '#76c7c0';
    this.backgroundColor = props.backgroundColor ?? '#e0e0e0';
    this.borderRadius = (props.borderRadius && props.borderRadius >= 0) ? props.borderRadius : 0;
    this.state = { 
       progress: this.value ?? 0,
       maxWidth : this.max ?? 100,
       borderRadius : this.borderRadius ?? 0,
       backgroundColor : this.backgroundColor ?? "#e0e0e0",
       color : this.color ?? "#76c7c0"
      };
  }

  componentDidUpdate(prevProps: MyClassComponentProps) {
    const { value, max, color, backgroundColor, borderRadius } = this.props;

    if (prevProps.value !== value) {
      this.updateValues({ prev: prevProps.value, current: value, propName: 'progress' });
    }
    if (prevProps.max !== max) {
      this.updateValues({ prev: prevProps.max, current: max, propName: 'maxWidth' });
    }
    if (prevProps.color !== color) {
      this.updateValues({ prev: prevProps.color, current: color, propName: 'color' });
    }
    if (prevProps.backgroundColor !== backgroundColor) {
      this.updateValues({ prev: prevProps.backgroundColor, current: backgroundColor, propName: 'backgroundColor' });
    }
    if (prevProps.borderRadius !== borderRadius) {
      this.updateValues({ prev: prevProps.borderRadius, current: borderRadius, propName: 'borderRadius' });
    }
  }

  private updateValues = ({ prev, current, propName }: { prev: any; current: any; propName: keyof MyClassComponentState }) => {
    if (prev !== current) {
      this.setState((prevState) => ({
        ...prevState,
        [propName]: current
      }));
    }
  }

  render() {
    const styleSheet: CustomCSSProperties = {
      '--max': `${this.state.maxWidth}%`,
      '--value': `${this.state.progress}%`,
      '--backgroundColor': this.state.backgroundColor,
      '--color': this.state.color,
      '--borderRadius': `${this.state.borderRadius}px`,
    };

    return (
      <div className='DGR-progress-container' style={styleSheet}>
        <div className="DGR-progress-bar" id="DGR-progress-bar" style={styleSheet}></div>
      </div>
    );
  }
}

export default ProgressBar;

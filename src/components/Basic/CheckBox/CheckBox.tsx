import React from 'react';
import { Component, CSSProperties } from 'react'
import "./CheckBox.scss";

type Mode = "light"|"dark";

interface MyClassComponentProps{
    color ?: string;
    isChecked ?: Function;
    mode ?: Mode;
}

interface MyClassComponentState{
    color : string;
    isChecked : boolean;
    mode : Mode;
}

interface CustomCSSProperties extends CSSProperties{
    "--color" : string;
    "--isChecked" : string;
    "--mode" : string;
}

export class CheckBox extends Component<MyClassComponentProps, MyClassComponentState> {

    static defaultProps = {
        color: "#e3e3e3",
        isChecked: false,
        mode: "light"
    }

    constructor(props: MyClassComponentProps){
        super(props);
        this.state = {
            color : (props.color) ? props.color : CheckBox.defaultProps.color,
            isChecked : false,
            mode : props.mode? props.mode : CheckBox.defaultProps.mode as Mode
        }
    }

    componentDidUpdate(prevProps: Readonly<MyClassComponentProps>, {}): void {
        const {color, mode} = this.props;
        if(prevProps.color != color){
            this.updateValues({prev: prevProps.color, current: color, propName: 'color'})
        }

        if(prevProps.mode != mode){
            this.updateValues({prev: prevProps.mode, current: mode, propName: "mode"})
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

      private toggleCheckBox = () => {
        this.setState(prevState => ({
          ...prevState,  
          isChecked:!prevState.isChecked
        }));
        this.props.isChecked && this.props.isChecked(!this.state.isChecked);  // Call the provided function if it exists.  // Also, this function should return the new checked state.  // If no function is provided, the component should still behave as expected.  // This function should be called when the checkbox is clicked.  // If the checkbox is clicked, it should toggle its state (checked or unchecked) and call the provided isChecked function with the new checked state
      }

  render() {

    const styleSheet : CustomCSSProperties = {
        "--color" : this.state.color,
        "--isChecked" : this.state.isChecked? "flex" : "none",
        "--mode" : this.state.mode
    }

    return (
        <div className='DGR-checkBox-Container' style={styleSheet} onClick={()=>this.toggleCheckBox()}>
            <div className='DGR-checkBox' style={styleSheet}>
              <span className='DGR-check' style={styleSheet}>
                <div className='check-icon' style={styleSheet}></div>
              </span>
            </div>
        </div>
    )
  }
}

export default CheckBox

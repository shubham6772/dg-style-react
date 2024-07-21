import React from 'react';
import { CSSProperties, Component } from 'react';
import './ColorSpinner.scss';

type Size = 'small' | 'medium' | 'large';
type Mode = 'light' | 'dark';

interface SpinnerPropsTypes {
    color?: string;
    mode?: Mode;
    size: Size;
}

interface CustomCSSProperties extends CSSProperties {
    '--color': string;
    '--mode': string;
}

const sizePrefix = 'DGR-ColorSpinner-';

const sizeMapper: Record<Size, string> = {
    small: `${sizePrefix}smallSize`,
    medium: `${sizePrefix}mediumSize`,
    large: `${sizePrefix}largeSize`,
};

class ColorSpinner extends Component<SpinnerPropsTypes> {
    static defaultProps = {
        color: '#3498db',
        size: 'small',
        mode: 'light',
    };

    render() {
        const { 
           color = ColorSpinner.defaultProps.color,
           size  = ColorSpinner.defaultProps.size, 
           mode = ColorSpinner.defaultProps.mode } = this.props;
        
        const styleSheets: CustomCSSProperties = {
            '--color': color,
            '--mode': mode === 'light' ? '#f3f3f3' : '#000000',
        };

        return (
            <div 
                id='DGR-ColorSpinner' 
                className={sizeMapper[size as Size]} 
                style={styleSheets} 
            />
        );
    }
}

export default ColorSpinner;

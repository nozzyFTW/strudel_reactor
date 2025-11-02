import { useState } from 'react';
import { CircularSliderWithChildren } from 'react-circular-slider-svg';

export const Dial = ({ effectType, minValue, maxValue }) => {
    const [value, setValue] = useState(0);

    return (
        <CircularSliderWithChildren
            handle1={{
                value: value,
                onChange: (v) => setValue(v),
            }}
            arcColor="#690"
            startAngle={90}
            endAngle={270}
            minValue={minValue}
            maxValue={maxValue}
        >
            <div style={{ textAlign: 'center', userSelect: 'none' }}>
                <b>{value.toFixed(2)}</b>
                <br />
                {effectType}
            </div>
        </CircularSliderWithChildren>
    );
};

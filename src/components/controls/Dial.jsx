import { useState, useEffect } from 'react';
import { CircularSliderWithChildren } from 'react-circular-slider-svg';

export const Dial = ({ effectType, minValue, maxValue, handler, value: propValue }) => {
    const [value, setValue] = useState(propValue ?? 0);

    useEffect(() => {
        setValue(propValue ?? 0);
    }, [propValue]);

    return (
        <div style={{ height: '125px' }}>
            <CircularSliderWithChildren
                handle1={{
                    value: value,
                    onChange: (v) => {
                        setValue(v);
                        handler(v);
                    },
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
        </div>
    );
};

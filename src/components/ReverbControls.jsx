import { Dial } from './Dial.jsx';
export const ReverbControls = ({ trackName, setReverbSettings }) => {
    const handleRoomChange = (newValue) => {
        setReverbSettings((prevSettings) => ({
            ...prevSettings,
            [trackName]: {
                ...prevSettings[trackName],
                room: newValue,
            },
        }));
    };

    const handleRoomSizeChange = (newValue) => {
        setReverbSettings((prevSettings) => ({
            ...prevSettings,
            [trackName]: {
                ...prevSettings[trackName],
                roomSize: newValue,
            },
        }));
    };

    const handleRoomFadeChange = (newValue) => {
        setReverbSettings((prevSettings) => ({
            ...prevSettings,
            [trackName]: {
                ...prevSettings[trackName],
                roomFade: newValue,
            },
        }));
    };

    const handleLPFChange = (newValue) => {
        setReverbSettings((prevSettings) => ({
            ...prevSettings,
            [trackName]: {
                ...prevSettings[trackName],
                lpf: newValue,
            },
        }));
    };

    const reverbControlList = [
        { name: 'Room', min: 0, max: 1, handlerFn: handleRoomChange },
        { name: 'Room Size', min: 0, max: 10, handlerFn: handleRoomSizeChange },
        { name: 'Room Fade', min: 0, max: 20, handlerFn: handleRoomFadeChange },
        { name: 'LPF', min: 0, max: 20000, handlerFn: handleLPFChange },
    ];

    return (
        <div className="d-flex justify-content-between flex-wrap" style={{ width: '100%' }}>
            {reverbControlList.map((control, index) => (
                <Dial
                    key={index}
                    effectType={control.name}
                    minValue={control.min}
                    maxValue={control.max}
                    handler={control.handlerFn}
                />
            ))}
        </div>
    );
};

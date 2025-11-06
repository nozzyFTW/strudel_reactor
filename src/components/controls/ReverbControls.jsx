import { Dial } from './Dial.jsx';
export const ReverbControls = ({ trackName, setTrackEffectMap, setChangesActive }) => {
    const handleRoomChange = (newValue) => {
        setTrackEffectMap((prevMap) => ({
            ...prevMap,
            [trackName]: {
                ...prevMap[trackName],
                reverb: {
                    ...prevMap[trackName].reverb,
                    room: newValue,
                },
            },
        }));
        setChangesActive(true);
    };

    const handleRoomSizeChange = (newValue) => {
        setTrackEffectMap((prevMap) => ({
            ...prevMap,
            [trackName]: {
                ...prevMap[trackName],
                reverb: {
                    ...prevMap[trackName].reverb,
                    roomSize: newValue,
                },
            },
        }));
        setChangesActive(true);
    };

    const handleRoomFadeChange = (newValue) => {
        setTrackEffectMap((prevMap) => ({
            ...prevMap,
            [trackName]: {
                ...prevMap[trackName],
                reverb: {
                    ...prevMap[trackName].reverb,
                    roomFade: newValue,
                },
            },
        }));
        setChangesActive(true);
    };

    const handleRoomLowPassChange = (newValue) => {
        setTrackEffectMap((prevMap) => ({
            ...prevMap,
            [trackName]: {
                ...prevMap[trackName],
                reverb: {
                    ...prevMap[trackName].reverb,
                    roomLowPass: newValue,
                },
            },
        }));
        setChangesActive(true);
    };

    const reverbControlList = [
        { name: 'Room', min: 0, max: 1, handlerFn: handleRoomChange },
        { name: 'Room Size', min: 0, max: 10, handlerFn: handleRoomSizeChange },
        { name: 'Room Fade', min: 0, max: 20, handlerFn: handleRoomFadeChange },
        { name: 'Low Pass', min: 0, max: 20000, handlerFn: handleRoomLowPassChange },
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

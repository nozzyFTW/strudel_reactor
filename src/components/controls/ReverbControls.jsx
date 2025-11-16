import { Dial } from './Dial.jsx';
export const ReverbControls = ({ trackName, setTrackEffectMap, setChangesActive }) => {
    /**
     * Handle Room Reverb Setting change event
     * @param {Number} newValue
     */
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

    /**
     * Handle Room Size Reverb Setting change event
     * @param {Number} newValue
     */
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

    /**
     * Handle Room Fade Reverb Setting change event
     * @param {Number} newValue
     */
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

    /**
     * Handle Room Low Pass Reverb Setting change event
     * @param {Number} newValue
     */
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

    // Array of reverb controls
    const reverbControlList = [
        { name: 'Room', max: 1, handlerFn: handleRoomChange },
        { name: 'Room Size', max: 10, handlerFn: handleRoomSizeChange },
        { name: 'Room Fade', max: 20, handlerFn: handleRoomFadeChange },
        { name: 'Low Pass', max: 20000, handlerFn: handleRoomLowPassChange },
    ];

    return (
        <div className="d-flex justify-content-between flex-wrap" style={{ width: '100%' }}>
            {reverbControlList.map((control, index) => (
                <Dial
                    key={index}
                    effectType={control.name}
                    minValue={0}
                    maxValue={control.max}
                    handler={control.handlerFn}
                />
            ))}
        </div>
    );
};

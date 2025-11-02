import { Dial } from './Dial.jsx';
export const ReverbControls = () => {
    const reverbControlList = [
        { name: 'Room', min: 0, max: 1, handler: handleRoomChange },
        { name: 'Room Size', min: 0, max: 10, handler: handleRoomSizeChange },
        { name: 'Room Fade', min: 0, max: 20, handler: handleRoomFadeChange },
        { name: 'LPF', min: 0, max: 20000, handler: handleLPFChange },
    ];

    const handleRoomChange = (newValue) => {};

    const handleRoomSizeChange = (newValue) => {};

    const handleRoomFadeChange = (newValue) => {};

    const handleLPFChange = (newValue) => {};

    return (
        <div className="d-flex justify-content-between flex-wrap" style={{ width: '100%' }}>
            {reverbControlList.map((control, index) => (
                <Dial
                    key={index}
                    effectType={control.name}
                    minValue={control.min}
                    maxValue={control.max}
                />
            ))}
        </div>
    );
};

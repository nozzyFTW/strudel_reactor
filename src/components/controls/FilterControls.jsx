import { Dial } from './Dial';

export const FilterControls = ({ setTrackEffectMap, setChangesActive }) => {
    const handleLPFilterChange = (newValue) => {
        setTrackEffectMap((prevMap) => ({
            ...prevMap,
            global: {
                ...prevMap['global'],
                filter: {
                    ...prevMap['global'].filter,
                    low: newValue,
                },
            },
        }));
        setChangesActive(true);
    };

    const handleBPFilterChange = (newValue) => {
        setTrackEffectMap((prevMap) => ({
            ...prevMap,
            global: {
                ...prevMap['global'],
                filter: {
                    ...prevMap['global'].filter,
                    band: newValue,
                },
            },
        }));
        setChangesActive(true);
    };

    const handleHPFilterChange = (newValue) => {
        setTrackEffectMap((prevMap) => ({
            ...prevMap,
            global: {
                ...prevMap['global'],
                filter: {
                    ...prevMap['global'].filter,
                    high: newValue,
                },
            },
        }));
        setChangesActive(true);
    };

    const filterControlList = [
        { name: 'Low', handlerFn: handleLPFilterChange },
        { name: 'Mid', handlerFn: handleBPFilterChange },
        { name: 'High', handlerFn: handleHPFilterChange },
    ];

    return (
        <div className="d-flex justify-content-between flex-wrap" style={{ width: '100%' }}>
            {filterControlList.map((control, index) => (
                <Dial
                    key={index}
                    effectType={control.name}
                    minValue={0}
                    maxValue={20000}
                    handler={control.handlerFn}
                />
            ))}
        </div>
    );
};
